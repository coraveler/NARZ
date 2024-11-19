package com.kdt_final.back.shop.domain;

import lombok.Data;

@Data
public class CouponRequest {
    private String couponCode;
    private int userId; 
    // private int couponId;
}
