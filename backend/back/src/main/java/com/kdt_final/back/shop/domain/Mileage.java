package com.kdt_final.back.shop.domain;

import java.util.Date;
import lombok.Data;

@Data
public class Mileage {
    private int mileageId;      // 마일리지 ID (PK)
    private int userId;         // 사용자 ID
    private int mileage;         // 적립된 포인트
    private int couponId;       // 연관된 쿠폰 ID (추가)
    private String changeHistory; // 변경 내역
    private Date createdAt;     // 생성 시간 (변경)
}
