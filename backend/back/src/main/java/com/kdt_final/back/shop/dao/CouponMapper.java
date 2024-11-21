package com.kdt_final.back.shop.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.data.repository.query.Param;

@Mapper
public interface CouponMapper {

    @Select("SELECT points FROM coupon WHERE couponCode = #{couponCode}")
    Integer getPointsByCouponCode(@Param("couponCode") String couponCode);

    @Delete("DELETE FROM Coupon WHERE couponCode = #{couponCode}")
    Integer deleteCouponCode(String couponCode);

    @Update("UPDATE coupon SET coupnCode = #{number} WHERE email = #{sendEmail}")
    int updateCoupon(@Param("sendEmail") String sendEmail, @Param("number") String number);

}
