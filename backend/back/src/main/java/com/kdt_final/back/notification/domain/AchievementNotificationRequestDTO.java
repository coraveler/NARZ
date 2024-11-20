package com.kdt_final.back.notification.domain;

import lombok.Data;

@Data
public class AchievementNotificationRequestDTO {
    private int userId;
    private String achievement;
}
