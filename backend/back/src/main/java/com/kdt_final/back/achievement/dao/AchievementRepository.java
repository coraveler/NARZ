package com.kdt_final.back.achievement.dao;

import com.kdt_final.back.achievement.domain.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AchievementRepository extends JpaRepository<Achievement, Integer> {
    @Query("SELECT a.achievementId FROM Achievement a WHERE a.userId = :userId")
    List<Integer> findAchievementIdsByUserId(@Param("userId") Integer userId);
    Optional<Achievement> findByUserIdAndAchievementId(Long userId, Integer achievementId);
}