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
                                                                                                       // 추적용

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
        SseEmitter oldEmitter = sseEmitters.get(userId);
        if (oldEmitter != null) {
            oldEmitter.complete();
            sseEmitters.remove(userId);
            emitterStatus.remove(userId);
        }

        // 새로운 SseEmitter 생성 (timeout 증가)
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        sseEmitters.put(userId, emitter);

        // 상태 초기화 (true로 설정)
        AtomicBoolean status = new AtomicBoolean(true);
        emitterStatus.put(userId, status);

        // 초기 데이터 전송
        try {
            int initialMileage = mileageService.getTotalMileage(userId);
            emitter.send(SseEmitter.event()
                    .name("mileage")
                    .data(initialMileage));
            System.out.println("Initial mileage sent for userId " + userId + ": " + initialMileage);
        } catch (Exception e) {
            System.err.println("Error sending initial mileage: " + e.getMessage());
            emitter.completeWithError(e);
            return emitter;
        }

        // SSE 전송 쓰레드
        Thread sseThread = new Thread(() -> {
            int lastMileage = -1; // 초기값을 -1로 설정하여 첫 비교에서 항상 전송되도록 함

            while (status.get() && !Thread.currentThread().isInterrupted()) {
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
                    System.err.println("SSE Error for userId " + userId + ": " + e.getMessage());
                    emitter.completeWithError(e);
                    status.set(false);
                    break;
                }
            }
            System.out.println("SSE Thread terminated for userId: " + userId);
        });

        sseThread.setDaemon(true);
        sseThread.start();

        // 연결 종료 처리
        emitter.onCompletion(() -> {
            System.out.println("SSE completed for userId: " + userId);
            status.set(false);
            sseEmitters.remove(userId);
            emitterStatus.remove(userId);
            sseThread.interrupt();
        });

        emitter.onTimeout(() -> {
            System.out.println("SSE timeout for userId: " + userId);
            status.set(false);
            sseEmitters.remove(userId);
            emitterStatus.remove(userId);
            emitter.complete();
            sseThread.interrupt();
        });

        emitter.onError((e) -> {
            System.err.println("SSE error for userId " + userId + ": " + e.getMessage());
            status.set(false);
            sseEmitters.remove(userId);
            emitterStatus.remove(userId);
            sseThread.interrupt();
        });

        return emitter;
    }

}
