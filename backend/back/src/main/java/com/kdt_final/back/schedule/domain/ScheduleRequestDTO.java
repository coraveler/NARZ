package com.kdt_final.back.schedule.domain;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class ScheduleRequestDTO {
    private int id;
    private String title;
    private String content;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String userId;
    private String color;
}
