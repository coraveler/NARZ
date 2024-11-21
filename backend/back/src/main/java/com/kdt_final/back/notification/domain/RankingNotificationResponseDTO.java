package com.kdt_final.back.notification.domain;

import lombok.Data;

@Data
public class RankingNotificationResponseDTO {
    private String author;
    private int ranking;
    private boolean isNotified;
}
