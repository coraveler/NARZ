package com.kdt_final.back.Shop.domain;

import java.util.Date;

public class Mileage {
    private int mileageId;
    private int userId;
    private int mileage;
    private String changeHistory;
    private Date changeDate;

    // Getter 및 Setter 메서드
    public int getMileageId() {
        return mileageId;
    }

    public void setMileageId(int mileageId) {
        this.mileageId = mileageId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMileage() {
        return mileage;
    }

    public void setMileage(int mileage) {
        this.mileage = mileage;
    }

    public String getChangeHistory() {
        return changeHistory;
    }

    public void setChangeHistory(String changeHistory) {
        this.changeHistory = changeHistory;
    }

    public Date getChangeDate() {
        return changeDate;
    }

    public void setChangeDate(Date changeDate) {
        this.changeDate = changeDate;
    }
}
