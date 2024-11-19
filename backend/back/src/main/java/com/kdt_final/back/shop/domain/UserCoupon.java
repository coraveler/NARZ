package com.kdt_final.back.shop.domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserCoupon {
   private int userCouponId;
    private int userId;
    private int couponId;
    private boolean isUsed;
    private LocalDateTime usedDate;


    public boolean getIsUsed() {
        return isUsed;
    }
 
    public void setIsUsed(boolean isUsed) {
        this.isUsed = isUsed;
    }
}
