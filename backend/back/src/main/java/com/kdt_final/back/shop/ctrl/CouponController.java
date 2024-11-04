package com.kdt_final.back.shop.ctrl;

import com.kdt_final.back.shop.domain.CouponRequest;
import com.kdt_final.back.shop.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupon")
public class CouponController {
    private final CouponService couponService;

    @Autowired
    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @PostMapping("/register")
    public String registerCoupon(@RequestBody CouponRequest couponRequest) {
        boolean isRegistered = couponService.registerCoupon(couponRequest);
        if (isRegistered) {
            return "쿠폰이 성공적으로 등록되었습니다!";
        } else {
            return "유효하지 않은 쿠폰 코드입니다.";
        }
    }
}
