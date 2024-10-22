package com.kdt_final.back.festival.domain;

import java.time.LocalDate;

import lombok.Data;

@Data
public class FestivalResponseDTO {
    private String id;
    private String title;
    private String place;
    private String roadAddress;
    private String landAddress;
    private LocalDate startDate;
    private LocalDate endDate;
    private double lat;
    private double lon;
}
