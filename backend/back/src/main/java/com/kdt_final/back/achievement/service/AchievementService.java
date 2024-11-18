package com.kdt_final.back.achievement.service;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kdt_final.back.achievement.dao.AchievementRepository;
import com.kdt_final.back.comment.service.CommentService;
import com.kdt_final.back.user.dao.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AchievementService {
    private final AchievementRepository achievementRepository;
    private final UserRepository userRepository;
    private final CommentService commentService;
    private static final List<String> REQUIRED_REGIONS = List.of("chungbuk", "chungnam", "daejeon", "gangwon", "gyeonbuk", "gyeongnam", "jeju", "jeonbuk", "jeonnam", "sudo");

    public String getBadgeName(int achievementId) {
    switch (achievementId) {
        case 0: return "여행 초보자";
        case 1: return "전국 일주자";
        case 2: return "여행의 장인";
        case 3: return "댓글마스터";
        case 4: return "전국 정복자";
        case 5: return "최고 활동러";
        case 6: return "핫한 작가님";
        default: return "여행 초보자";
    }
}

    public List<Integer> getUnlockedAchievements(Integer userId) {
        return achievementRepository.findAchievementIdsByUserId(userId);
    }

    public boolean checkMapCompletion(Integer userId) {
        try {
            String basePath = System.getProperty("user.dir") + "/uploads/images/map/" + userId;
            long fileCount = Files.list(Paths.get(basePath)).filter(Files::isRegularFile).count();
            return fileCount >= 10;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean checkPostCount(Integer userId, int requiredCount) {
        int postCount = userRepository.getUserPostCount(userId);
        return postCount >= requiredCount;
    }

    public boolean checkCommentCount(Integer userId, int requiredCount) {
        int commentCount = commentService.getUserCommentCount(userId);
        return commentCount >= requiredCount;
    }

    public boolean checkAllRegionsCoverage(Integer userId) {
        List<String> userRegions = userRepository.getUserPostRegions(userId);
        return userRegions.containsAll(REQUIRED_REGIONS);
    }
}
