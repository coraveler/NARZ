package com.kdt_final.back.shop.dao;

import com.kdt_final.back.shop.domain.Coupon;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface CouponMapper {

    @Select("SELECT * FROM Coupon WHERE couponCode = #{couponCode}")
    Coupon findByCouponCode(String couponCode);

    @Select("SELECT points FROM Coupon WHERE couponCode = #{couponCode}")
    Integer getPointsByCouponCode(String couponCode);
}
