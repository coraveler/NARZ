package com.kdt_final.back.ShopTest;

import com.kdt_final.back.Shop.dao.CouponMapper;
import com.kdt_final.back.Shop.domain.CouponRequest;
import com.kdt_final.back.Shop.domain.Mileage;
import com.kdt_final.back.Shop.service.CouponService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.*;

class CouponServiceTest {

    @Mock
    private CouponMapper couponMapper;

    @InjectMocks
    private CouponService couponService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterCoupon_ValidCoupon() {
        // Given
        CouponRequest couponRequest = new CouponRequest();
        couponRequest.setUserId(123);
        couponRequest.setCouponCode("testcp");

        // When
        boolean result = couponService.registerCoupon(couponRequest);

        // Then
        assertTrue(result);
        verify(couponMapper, times(1)).addMileage(any(Mileage.class));
    }

    @Test
    void testRegisterCoupon_InvalidCoupon() {
        // Given
        CouponRequest couponRequest = new CouponRequest();
        couponRequest.setUserId(123);
        couponRequest.setCouponCode("invalid");

        // When
        boolean result = couponService.registerCoupon(couponRequest);

        // Then
        assertFalse(result);
        verify(couponMapper, never()).addMileage(any(Mileage.class));
    }
}
