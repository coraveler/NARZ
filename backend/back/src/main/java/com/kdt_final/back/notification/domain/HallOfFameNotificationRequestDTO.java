package com.kdt_final.back.notification.domain;

import lombok.Data;

@Data
public class HallOfFameNotificationRequestDTO {
    private String author;
    private String weekOf;
    private int ranking;
}
