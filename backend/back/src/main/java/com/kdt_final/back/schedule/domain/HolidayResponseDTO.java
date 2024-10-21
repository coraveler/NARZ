package com.kdt_final.back.schedule.domain;

import java.time.LocalDate;

import lombok.Data;

@Data
public class HolidayResponseDTO {
    private String id;
    private String title;
    private LocalDate date;
    private String color;
}
