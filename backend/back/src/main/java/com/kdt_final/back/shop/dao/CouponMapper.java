package com.kdt_final.back.shop.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
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

    @Insert("INSERT INTO Coupon (couponCode, points) VALUES (#{number}, 1000)")
    Integer insertCoupon(@Param("number") String number);

}
