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

        // 기존 연결 정리
        cleanupExistingConnection(userId);

        // 새로운 SseEmitter 생성
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        sseEmitters.put(userId, emitter);

         // 상태 초기화 (null 체크 및 기본값 설정)
         AtomicBoolean status = emitterStatus.computeIfAbsent(userId, k -> new AtomicBoolean(true));

        // 초기 데이터 전송
        try {
            int initialMileage = mileageService.getTotalMileage(userId);
            emitter.send(SseEmitter.event()
                    .name("mileage")
                    .data(initialMileage));
            System.out.println("Initial mileage sent for userId " + userId + ": " + initialMileage);
        } catch (Exception e) {
            handleEmitterError(userId, emitter, e);
            return emitter;
        }

        // SSE 전송 쓰레드
        Thread sseThread = new Thread(() -> {
            int lastMileage = -1;

            while (!Thread.currentThread().isInterrupted()) {
                // Thread-safe한 방식으로 status 확인
                AtomicBoolean currentStatus = emitterStatus.get(userId);
                if (currentStatus == null || !currentStatus.get()) {
                    break;
                }

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
                } catch (Exception e) {
                    handleEmitterError(userId, emitter, e);
                    break;
                }
            }
            System.out.println("SSE Thread terminated for userId: " + userId);
        });

        sseThread.setDaemon(true);
        sseThread.start();

        // 이벤트 핸들러 설정
        setupEmitterEventHandlers(userId, emitter, status, sseThread);

        return emitter;
    }

    private void cleanupExistingConnection(int userId) {
        SseEmitter oldEmitter = sseEmitters.get(userId);
        if (oldEmitter != null) {
            oldEmitter.complete();
            sseEmitters.remove(userId);
            // 상태 객체는 삭제하지 않고, false로 설정만 해둡니다
            AtomicBoolean status = emitterStatus.get(userId);
            if (status != null) {
                status.set(false);  // 상태만 종료
            }
        }
    }
    private void handleEmitterError(int userId, SseEmitter emitter, Exception e) {
        System.err.println("Error for userId " + userId + ": " + e.getMessage());
        emitterStatus.remove(userId);
        sseEmitters.remove(userId);
        emitter.completeWithError(e);
    }

    private void setupEmitterEventHandlers(int userId, SseEmitter emitter, AtomicBoolean status, Thread sseThread) {
        emitter.onCompletion(() -> {
            System.out.println("SSE completed for userId: " + userId);
            cleanup(userId, status, sseThread);
        });

        emitter.onTimeout(() -> {
            System.out.println("SSE timeout for userId: " + userId);
            cleanup(userId, status, sseThread);
            emitter.complete();
        });

        emitter.onError((e) -> {
            System.err.println("SSE error for userId " + userId + ": " + e.getMessage());
            cleanup(userId, status, sseThread);
        });
    }

       private void cleanup(int userId, AtomicBoolean status, Thread sseThread) {
        // 상태 객체를 삭제하지 않고 false로 설정합니다
        if (status != null) {
            status.set(false);
        }
        sseEmitters.remove(userId);
        emitterStatus.remove(userId);
        sseThread.interrupt();
    }
}

