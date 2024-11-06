package com.kdt_final.back.shop.domain;

import java.util.Date;

import lombok.Data;

@Data
public class Mileage {
    private int mileageId;
    private int userId;
    private int mileage;
    private String changeHistory;
    private Date changeDate;
}
