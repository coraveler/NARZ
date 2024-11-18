package com.kdt_final.back.shop.domain;

import lombok.Data;

@Data
public class Coupon {
  private int couponId;
    private String couponCode;
    private Integer points;
}
