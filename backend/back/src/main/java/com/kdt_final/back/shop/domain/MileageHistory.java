package com.kdt_final.back.shop.domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class MileageHistory {
    private int id;              // 내역 ID
    private int userId;         // 사용자 ID
    private int mileagePoints;   // 마일리지 포인트
    private String description;  // 내역 설명
    private LocalDateTime createdAt; // 생성일

}
