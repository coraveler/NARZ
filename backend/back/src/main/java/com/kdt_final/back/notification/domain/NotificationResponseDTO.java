package com.kdt_final.back.notification.domain;
import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class NotificationResponseDTO {
    private int id;
    private String title;
    private LocalDate startDate;
    private LocalTime startTime;
    private String userId;
}
