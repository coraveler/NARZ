package com.kdt_final.back.achievement.dao;

import com.kdt_final.back.achievement.domain.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Integer> {
    boolean existsByUserIdAndAchievementName(int userId, String achievementName);
}