package com.kdt_final.back.achievement.ctrl;

import com.kdt_final.back.achievement.service.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/achievement")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;

    @PostMapping("/set/{userId}/{achievementId}")
    public ResponseEntity<String> setAchievement(
        @PathVariable Integer userId,
        @PathVariable Integer achievementId) {
    // 디버그 메시지 추가
    System.out.println("Received request with userId: " + userId + " and achievementId: " + achievementId);

    boolean isSet = achievementService.setAchievement(userId, achievementId);
    
    if (isSet) {
        return ResponseEntity.ok("Achievement set successfully.");
    } else {
        return ResponseEntity.badRequest().body("Achievement requirements not met.");
    }
}


}
