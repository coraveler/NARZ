package com.kdt_final.back.shop.domain;

import java.time.LocalDateTime;

public class MileageHistory {
    private Long mileageId;
    private String userId;
    private int mileagePoints;
    private String description;
    private LocalDateTime changeDate;

    // 기본 생성자, getter/setter 메소드
    public MileageHistory() {}

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
