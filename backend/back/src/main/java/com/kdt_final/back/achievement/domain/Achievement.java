package com.kdt_final.back.achievement.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "achievement")  // 테이블 이름이 데이터베이스와 일치해야 함
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int achievementId;

    private int userId;
    private String achievementName;
    private LocalDateTime achievedDate;
}