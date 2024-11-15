package com.kdt_final.back.achievement.ctrl;

import com.kdt_final.back.achievement.service.AchievementService;
import com.kdt_final.back.user.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/achievement")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;
    
    private final UserService userService;

    @PostMapping("/set/{userId}/{achievementId}")
    public ResponseEntity<String> assignAchievement(@PathVariable int userId, @PathVariable int achievementId) {
    String badgeName = achievementService.getBadgeName(achievementId);
    boolean success = userService.updateUserAchievement(userId, badgeName);
    return success ? ResponseEntity.ok("Achievement updated successfully.") 
                   : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update achievement.");
}

    @GetMapping("/map-complete/{userId}")
    public ResponseEntity<Boolean> isMapComplete(@PathVariable Integer userId) {
        boolean isComplete = achievementService.checkMapCompletion(userId);
        return ResponseEntity.ok(isComplete);
    }

    @GetMapping("/post-count/{userId}")
    public ResponseEntity<Boolean> isPostCountSufficient(@PathVariable Integer userId, @RequestParam int requiredCount) {
        boolean isSufficient = achievementService.checkPostCount(userId, requiredCount);
        return ResponseEntity.ok(isSufficient);
    }

    @GetMapping("/comment-count/{userId}")
    public ResponseEntity<Boolean> isCommentCountSufficient(@PathVariable Integer userId, @RequestParam int requiredCount) {
        boolean isSufficient = achievementService.checkCommentCount(userId, requiredCount);
        return ResponseEntity.ok(isSufficient);
    }

    @GetMapping("/all-regions/{userId}")
    public ResponseEntity<Boolean> isAllRegionsCovered(@PathVariable Integer userId) {
        boolean allCovered = achievementService.checkAllRegionsCoverage(userId);
        return ResponseEntity.ok(allCovered);
    }
}
