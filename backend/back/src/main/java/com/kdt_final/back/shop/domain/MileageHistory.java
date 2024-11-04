package com.kdt_final.back.shop.domain;

import java.time.LocalDateTime;

public class MileageHistory {
    private int id;              // 내역 ID
    private int userId;         // 사용자 ID
    private int mileagePoints;   // 마일리지 포인트
    private String description;  // 내역 설명
    private LocalDateTime createdAt; // 생성일

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getMileagePoints() { return mileagePoints; }
    public void setMileagePoints(int mileagePoints) { this.mileagePoints = mileagePoints; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
