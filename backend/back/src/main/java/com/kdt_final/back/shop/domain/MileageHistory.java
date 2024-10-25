package com.kdt_final.back.shop.domain;

import java.time.LocalDateTime;

public class MileageHistory {
    
    private Long mileageId;
    private String userId;
    private int mileagePoints;
    private String description;
    private LocalDateTime changeDate;

    // 기본 생성자
    public MileageHistory() {}

    // 매개변수 있는 생성자 (userId, mileagePoints, description)
    public MileageHistory(String userId, int mileagePoints, String description) {
        this.userId = userId;
        this.mileagePoints = mileagePoints;
        this.description = description;
        this.changeDate = LocalDateTime.now(); // 자동으로 현재 시간 설정
    }

    // Getter/Setter 메소드
    public Long getMileageId() {
        return mileageId;
    }

    public void setMileageId(Long mileageId) {
        this.mileageId = mileageId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getMileagePoints() {
        return mileagePoints;
    }

    public void setMileagePoints(int mileagePoints) {
        this.mileagePoints = mileagePoints;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getChangeDate() {
        return changeDate;
    }

    public void setChangeDate(LocalDateTime changeDate) {
        this.changeDate = changeDate;
    }
}
