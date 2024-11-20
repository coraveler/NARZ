package com.kdt_final.back.shop.ctrl;

import com.kdt_final.back.shop.domain.Mileage;
import com.kdt_final.back.shop.domain.MileageHistory;
import com.kdt_final.back.shop.service.MileageService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.concurrent.ConcurrentHashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import org.springframework.scheduling.annotation.Scheduled;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/mileage")
public class MileageController {
    private final MileageService mileageService;
    private final ConcurrentHashMap<Integer, SseEmitter> sseEmitters = new ConcurrentHashMap<>(); // 유저별 SSE 관리용 Map
    private final ConcurrentHashMap<Integer, AtomicBoolean> emitterStatus = new ConcurrentHashMap<>(); // 유저별 emitter 상태

    public MileageController(MileageService mileageService) {
        this.mileageService = mileageService;
    }

    @GetMapping("/{userId}")
    public Mileage getMileage(@PathVariable int userId) {
        return mileageService.getMileageByUserId(userId);
    }

    @PostMapping("/")
    public void addMileage(@RequestBody Mileage mileage) {
        mileageService.addMileage(mileage);
    }

    @PostMapping("/history")
    public void addMileageHistory(@RequestBody MileageHistory mileageHistory) {
        mileageService.addMileageHistory(mileageHistory);
    }

    @GetMapping("/history/{userId}")
    public List<MileageHistory> getMileageHistory(@PathVariable int userId) {
        return mileageService.getMileageHistory(userId);
    }

    @GetMapping("/total/{userId}")
    public ResponseEntity<Integer> getTotalMileage(@PathVariable int userId) {
        int totalMileage = mileageService.getTotalMileage(userId);
        System.out.println("Retrieved total mileage for userId " + userId + ": " + totalMileage);
        return ResponseEntity.ok(totalMileage);
    }

    // 실시간 마일리지 업데이트를 위한 SSE 엔드포인트
    @GetMapping("/sse/{userId}")
    public SseEmitter streamMileage(@PathVariable int userId) {
        System.out.println("SSE Connection requested for userId: " + userId);

        // 이미 기존 SSE 연결이 있는 경우 새로운 연결을 만들지 않음
        if (sseEmitters.containsKey(userId)) {
            System.out.println("SSE connection already exists for userId: " + userId);
            return sseEmitters.get(userId);
        }

        // 기존 연결 정리
        cleanupExistingConnection(userId);

        // 새로운 SseEmitter 생성
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        sseEmitters.put(userId, emitter);

        // 상태 초기화 (null 체크 및 기본값 설정)
        AtomicBoolean status = emitterStatus.computeIfAbsent(userId, k -> new AtomicBoolean(true));

        // 초기 마일리지 전송
        try {
            int initialMileage = mileageService.getTotalMileage(userId);
            System.out.println("Sending initial mileage: " + initialMileage);
            emitter.send(SseEmitter.event()
                    .name("mileage")
                    .data(initialMileage));
            System.out.println("Initial mileage sent successfully");
        } catch (Exception e) {
            System.err.println("Error sending initial mileage: " + e.getMessage());
            handleEmitterError(userId, emitter, e);
            return emitter;
        }

        // SSE 전송 쓰레드
        Thread sseThread = new Thread(() -> {
            int lastMileage = -1;
            while (!Thread.currentThread().isInterrupted()) {
                try {
                    int currentMileage = mileageService.getTotalMileage(userId);
                    if (currentMileage != lastMileage) {
                        System.out.println("Sending updated mileage for userId " + userId + ": " + currentMileage);
                        emitter.send(SseEmitter.event()
                                .name("mileage")
                                .data(currentMileage));
                        lastMileage = currentMileage;
                    }
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    // 인터럽트 발생 시 루프를 빠져나가도록 처리
                    Thread.currentThread().interrupt();
                    System.out.println("SSE Thread interrupted for userId: " + userId);
                    break;
                } catch (Exception e) {
                    System.out.println("Error in SSE thread for userId " + userId + ": " + e.getMessage());
                    break;
                }
            }
            System.out.println("SSE Thread terminated for userId: " + userId);
        });

        sseThread.setDaemon(true);
        sseThread.start();

        setupEmitterEventHandlers(userId, emitter, status, sseThread);

        return emitter;
    }

    private void cleanupExistingConnection(int userId) {
        SseEmitter oldEmitter = sseEmitters.get(userId);
        if (oldEmitter != null) {
            try {
                oldEmitter.send(SseEmitter.event().name("close").data("Connection closed"));
                oldEmitter.complete();
            } catch (Exception e) {
                System.err.println("Error closing old emitter for userId " + userId + ": " + e.getMessage());
            }
            sseEmitters.remove(userId);
            AtomicBoolean status = emitterStatus.get(userId);
            if (status != null) {
                status.set(false);
            }
        }
    }

    private void handleEmitterError(int userId, SseEmitter emitter, Exception e) {
        System.err.println("Error for userId " + userId + ": " + e.getMessage());
        emitterStatus.remove(userId);
        sseEmitters.remove(userId);
        try {
            emitter.send(SseEmitter.event().name("error").data("An error occurred: " + e.getMessage()));
            emitter.completeWithError(e);
        } catch (Exception ex) {
            System.err.println("Error sending error event to client: " + ex.getMessage());
        }
    }

    private void setupEmitterEventHandlers(int userId, SseEmitter emitter, AtomicBoolean status, Thread sseThread) {
        emitter.onCompletion(() -> {
            System.out.println("SSE completed for userId: " + userId);
            cleanup(userId, status, sseThread);
        });

        emitter.onTimeout(() -> {
            System.out.println("SSE timeout for userId: " + userId);
            cleanup(userId, status, sseThread);
            try {
                emitter.send(SseEmitter.event().name("close").data("Connection timed out"));
                emitter.complete();
            } catch (Exception e) {
                System.err.println("Error sending timeout event to client: " + e.getMessage());
            }
        });

        emitter.onError((e) -> {
            System.err.println("SSE error for userId " + userId + ": " + e.getMessage());
            cleanup(userId, status, sseThread);
        });
    }

    private void cleanup(int userId, AtomicBoolean status, Thread sseThread) {
        if (status != null) {
            status.set(false);
        }
        sseEmitters.remove(userId);
        emitterStatus.remove(userId);
        if (sseThread != null && !sseThread.isInterrupted()) {
            sseThread.interrupt();
        }
    }

    @Scheduled(fixedRate = 60000)
    public void cleanupSseConnections() {
        sseEmitters.entrySet().removeIf(entry -> {
            SseEmitter emitter = entry.getValue();
            if (emitter == null) {
                System.out.println("Removed null SSE connection for userId: " + entry.getKey());
                return true;
            }
            try {
                emitter.send(SseEmitter.event().comment("ping"));
                return false;
            } catch (Exception e) {
                System.out.println("Removed completed SSE connection for userId: " + entry.getKey());
                return true;
            }
        });
    }

    
}
