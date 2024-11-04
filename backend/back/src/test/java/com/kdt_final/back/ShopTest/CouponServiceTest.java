package com.kdt_final.back.ShopTest;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CouponController.class)
class CouponControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CouponService couponService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testRegisterCoupon_ValidCode() throws Exception {
        CouponRequest couponRequest = new CouponRequest();
        couponRequest.setCouponCode("VALIDCODE");
        couponRequest.setUserId(123);

        Mockito.when(couponService.registerCoupon(Mockito.any(CouponRequest.class)))
                .thenReturn(true);

        mockMvc.perform(post("/api/coupon/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(couponRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("쿠폰이 성공적으로 등록되었습니다!"));
    }

    @Test
    void testRegisterCoupon_InvalidCode() throws Exception {
        CouponRequest couponRequest = new CouponRequest();
        couponRequest.setCouponCode("INVALIDCODE");
        couponRequest.setUserId(123);

        Mockito.when(couponService.registerCoupon(Mockito.any(CouponRequest.class)))
                .thenReturn(false);

        mockMvc.perform(post("/api/coupon/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(couponRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("유효하지 않은 쿠폰 코드입니다."));
    }
}
