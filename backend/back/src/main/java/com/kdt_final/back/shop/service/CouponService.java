package com.kdt_final.back.shop.service;

import com.kdt_final.back.shop.dao.CouponMapper;
import com.kdt_final.back.shop.dao.MileageMapper;
import com.kdt_final.back.shop.domain.CouponRequest;
import com.kdt_final.back.shop.domain.Mileage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CouponService {
    private final CouponMapper couponMapper;
    private final MileageMapper mileageMapper;

    @Autowired
    public CouponService(CouponMapper couponMapper, MileageMapper mileageMapper) {
        this.couponMapper = couponMapper;
        this.mileageMapper = mileageMapper;
    }

    public boolean registerCoupon(CouponRequest couponRequest) {
        // 쿠폰 코드에 따른 포인트 조회
        Integer points = couponMapper.getPointsByCouponCode(couponRequest.getCouponCode());

        // "test" 쿠폰 코드일 경우 1000 포인트를 지급
        if ("test".equals(couponRequest.getCouponCode())) {
            points = 1000; // test 쿠폰 코드에 대한 포인트
        }

        // 포인트가 유효한 경우 마일리지 추가
        if (points != null) {
            Mileage mileage = new Mileage();
            mileage.setUserId(couponRequest.getUserId());
            mileage.setMileage(points);
            mileage.setChangeHistory("쿠폰 등록: " + couponRequest.getCouponCode());

            mileageMapper.insertMileage(mileage); // 마일리지 추가
            return true; // 성공적으로 등록됨
        }
        return false; // 유효하지 않은 쿠폰 코드
    }
}
