package com.kdt_final.back.notification.domain;

import java.time.LocalDate;

import lombok.Data;

@Data
public class RankingNotificationRequestDTO {
    private String author;
    private LocalDate weekOf;
    private String rankingType;
}
