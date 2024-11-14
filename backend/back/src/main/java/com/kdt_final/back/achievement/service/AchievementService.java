package com.kdt_final.back.achievement.service;

import com.kdt_final.back.comment.service.CommentService;
import com.kdt_final.back.user.dao.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final UserRepository userRepository;
    private final CommentService commentService; // CommentService 주입 추가
    private static final List<String> REQUIRED_REGIONS = List.of("chungbuk", "chungnam", "daejeon", "gangwon", "gyeonbuk", "gyeongnam", "jeju", "jeonbuk", "jeonnam", "sudo");

    public boolean setAchievement(Integer userId, Integer achievementId) {
        try {
            String achievementName;
            switch (achievementId) {
                case 1:
                    achievementName = "전국 일주자";
                    if (!isMapComplete(userId)) return false;
                    break;
                case 2:
                    achievementName = "여행의 장인";
                    if (!isPostCountSufficient(userId, 10)) return false;
                    break;
                case 3:
                    achievementName = "댓글 마스터";
                    if (!isCommentCountSufficient(userId, 10)) return false;
                    break;
                case 4:
                    achievementName = "전국 정복자";
                    if (!isAllRegionsCovered(userId)) return false;
                    break;
                default:
                    return false;
            }
            userRepository.updateAchievement(userId, achievementName);
            System.out.println("@@@@ AchievementService - Achievement set for userId: " + userId + ", achievementName: " + achievementName);
            return true;
        } catch (Exception e) {
            System.err.println("@@@@ Error in AchievementService: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    private boolean isMapComplete(Integer userId) {
        try {
            String basePath = "=/uploads/images/map/" + userId;

            // 파일 개수를 계산하여 10개 이상일 경우 true 반환
            long fileCount = Files.list(Paths.get(basePath))
                                   .filter(Files::isRegularFile) // 정규 파일만 카운트
                                   .count();

            boolean isComplete = fileCount >= 10;
            System.out.println("@@@@ AchievementService - Map Complete Check for userId: " + userId + " - File Count: " + fileCount + " - isComplete: " + isComplete);
            return isComplete;
        } catch (Exception e) {
            System.err.println("@@@@ Error in isMapComplete: " + e.getMessage());
            return false;
        }
    }

    private boolean isPostCountSufficient(Integer userId, int requiredCount) {
        int postCount = userRepository.getUserPostCount(userId); // 실제 게시글 개수 가져오기
        System.out.println("@@@@ AchievementService - Post Count for userId: " + userId + ": " + postCount);
        return postCount >= requiredCount;
    }

    private boolean isCommentCountSufficient(Integer userId, int requiredCount) {
        int commentCount = commentService.getUserCommentCount(userId); // 실제 댓글 개수 가져오기
        System.out.println("@@@@ AchievementService - Comment Count for userId: " + userId + ": " + commentCount);
        return commentCount >= requiredCount;
    }

    private boolean isAllRegionsCovered(Integer userId) {
        List<String> userRegions = userRepository.getUserPostRegions(userId); // 유저가 작성한 지역 리스트 가져오기

        // userRegions와 REQUIRED_REGIONS의 현재 상태를 출력
        System.out.println("@@@@ AchievementService - User's Covered Regions: " + userRegions);
        System.out.println("@@@@ AchievementService - Required Regions: " + REQUIRED_REGIONS);
    
        // 전체 지역이 커버되었는지 여부
        boolean allCovered = userRegions.containsAll(REQUIRED_REGIONS);
        System.out.println("@@@@ AchievementService - All Regions Covered for userId: " + userId + ": " + allCovered);
        
        return allCovered;
    }
}
