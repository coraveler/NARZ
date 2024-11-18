package com.kdt_final.back.shop.service;

import com.kdt_final.back.shop.dao.CouponMapper;
import com.kdt_final.back.shop.dao.UserCouponMapper;
import com.kdt_final.back.shop.domain.Coupon;
import com.kdt_final.back.shop.domain.UserCoupon;
import com.kdt_final.back.shop.domain.Mileage;
import com.kdt_final.back.shop.domain.CouponRequest;
import org.springframework.stereotype.Service;
import com.kdt_final.back.shop.dao.MileageMapper;

import java.time.LocalDateTime;

@Service
public class CouponService {
    private final CouponMapper couponMapper;
    private final UserCouponMapper userCouponMapper;
    private final MileageMapper mileageMapper;

    public CouponService(CouponMapper couponMapper, UserCouponMapper userCouponMapper, MileageMapper mileageMapper) {
        this.couponMapper = couponMapper;
        this.userCouponMapper = userCouponMapper;
        this.mileageMapper = mileageMapper;
    }

    public Integer getPointsByCouponCode(String couponCode) {
        return couponMapper.getPointsByCouponCode(couponCode);
    }

    public boolean registerCoupon(CouponRequest couponRequest) {
        // 이미 사용자가 해당 쿠폰으로 마일리지를 적립했는지 확인
        Mileage existingMileage = mileageMapper.findByUserIdAndCouponCode(couponRequest.getUserId(),
                couponRequest.getCouponCode());

        if (existingMileage != null) {
            // 이미 마일리지 적립된 경우
            return false;
        }

        // 쿠폰 코드에 따른 포인트 조회
        Integer points = couponMapper.getPointsByCouponCode(couponRequest.getCouponCode());

        if (points != null) {
            // 마일리지 추가
            Mileage mileage = new Mileage();
            mileage.setUserId(couponRequest.getUserId());
            mileage.setMileage(points);
            mileage.setChangeHistory("쿠폰 등록: " + couponRequest.getCouponCode());
            mileageMapper.insertMileage(mileage);

            // 사용자 쿠폰 등록
            UserCoupon userCoupon = new UserCoupon();
            userCoupon.setUserId(couponRequest.getUserId());
            userCoupon.setCouponId(couponRequest.getCouponId());
            userCoupon.setIsUsed(false);
            userCouponMapper.insertUserCoupon(userCoupon);

            return true;
        }
        return false; // 유효하지 않은 쿠폰
    }

    public String useCoupon(int userId, String couponCode) {
        Coupon coupon = couponMapper.findByCouponCode(couponCode);

        if (coupon == null) {
            return "유효하지 않은 쿠폰 코드입니다.";
        }

        // 사용자가 이미 해당 쿠폰을 사용했는지 체크
        UserCoupon userCoupon = userCouponMapper.findByUserIdAndCouponId(userId, coupon.getCouponId());

        if (userCoupon != null && userCoupon.getIsUsed()) {
            return "이 쿠폰은 이미 사용된 쿠폰입니다.";
        }

        if (userCoupon == null) {
            userCoupon = new UserCoupon();
            userCoupon.setUserId(userId);
            userCoupon.setCouponId(coupon.getCouponId());
            userCoupon.setIsUsed(true);
            userCoupon.setUsedDate(LocalDateTime.now());
            userCouponMapper.insertUserCoupon(userCoupon);
        } else {
            userCoupon.setIsUsed(true);
            userCoupon.setUsedDate(LocalDateTime.now());
            userCouponMapper.updateUserCoupon(userCoupon);
        }

        Integer points = coupon.getPoints();
        // 마일리지 처리 로직 추가...

        return "쿠폰이 성공적으로 사용되었습니다!";
    }

    public boolean isCouponUsed(int userId, String couponCode) {
        Coupon coupon = couponMapper.findByCouponCode(couponCode);

        if (coupon == null) {
            return false;
        }

        UserCoupon userCoupon = userCouponMapper.findByUserIdAndCouponId(userId, coupon.getCouponId());

        return userCoupon != null && userCoupon.getIsUsed();
    }
}
