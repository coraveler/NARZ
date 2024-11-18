package com.kdt_final.back.shop.ctrl;

import com.kdt_final.back.shop.domain.CouponRequest;
import com.kdt_final.back.shop.domain.MileageHistory;
import com.kdt_final.back.shop.service.CouponService;
import com.kdt_final.back.shop.service.MileageService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupon")
public class CouponController {
    private final CouponService couponService;
    private final MileageService mileageService;

    public CouponController(CouponService couponService, MileageService mileageService) {
        this.couponService = couponService;
        this.mileageService = mileageService;
    }

    @PostMapping("/register")
    public String registerCoupon(@RequestBody CouponRequest couponRequest) {
        boolean isRegistered = couponService.registerCoupon(couponRequest);

        if (isRegistered) {
            // 쿠폰 등록이 성공했을 경우 마일리지 기록 추가
            // 쿠폰 코드에 따른 포인트 조회
            String couponCode = couponRequest.getCouponCode().toUpperCase(); // 대문자로 변환
            Integer points = couponService.getPointsByCouponCode(couponRequest.getCouponCode());

            System.out.println("쿠폰 코드: " + couponCode + ", 조회된 포인트: " + points); // 디버그 로그

            if (points != null) {
                MileageHistory mileageHistory = new MileageHistory();
                mileageHistory.setUserId(couponRequest.getUserId());
                mileageHistory.setMileagePoints(points); // 조회한 포인트 사용
                mileageHistory.setDescription("쿠폰 등록" + couponRequest.getCouponCode());
                mileageService.addMileageHistory(mileageHistory); // 마일리지 내역 추가 메소드 호출

                return "쿠폰이 성공적으로 등록되었습니다!";
            } else {
                return "쿠폰 등록 후 포인트 기록을 추가하는데 문제가 발생했습니다.";
            }
        } else {
            return "유효하지 않은 쿠폰 코드입니다.";
        }
    }

    @PostMapping("/use")
    public String useCoupon(@RequestBody CouponRequest couponRequest) {
        String result = couponService.useCoupon(couponRequest.getUserId(), couponRequest.getCouponCode());
        return result;
    }

}
