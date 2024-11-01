package com.kdt_final.back.Shop.service;

import com.kdt_final.back.Shop.dao.CouponMapper;
import com.kdt_final.back.Shop.domain.CouponRequest;
import com.kdt_final.back.Shop.domain.Mileage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CouponService {
    private final CouponMapper couponMapper;

    @Autowired
    public CouponService(CouponMapper couponMapper) {
        this.couponMapper = couponMapper;
    }

    public boolean registerCoupon(CouponRequest couponRequest) {
        // 쿠폰 유효성 검사 로직 (예: "testcp" 쿠폰 코드일 때 포인트 지급)
        if ("testcp".equals(couponRequest.getCouponCode())) {
            Mileage mileage = new Mileage();
            mileage.setUserId(couponRequest.getUserId());
            mileage.setMileage(1000); // 쿠폰 등록으로 1000 포인트 지급
            mileage.setChangeHistory("쿠폰 등록: " + couponRequest.getCouponCode());

            // DB에 포인트 추가 (MileageMapper를 이용해 구현)
            couponMapper.addMileage(mileage);
            return true;
        }
        return false;
    }
}
