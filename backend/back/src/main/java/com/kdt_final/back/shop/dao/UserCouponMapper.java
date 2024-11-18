package com.kdt_final.back.shop.dao;

import com.kdt_final.back.shop.domain.UserCoupon;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface UserCouponMapper {

    @Select("SELECT * FROM UserCoupon WHERE userId = #{userId} AND couponId = (SELECT couponId FROM Coupon WHERE couponCode = #{couponCode})")
    UserCoupon findByUserIdAndCouponCode(int userId, String couponCode);

    @Select("SELECT * FROM UserCoupon WHERE userId = #{userId} AND couponId = #{couponId}")
    UserCoupon findByUserIdAndCouponId(int userId, int couponId);

    @Insert("INSERT INTO UserCoupon (userId, couponId, isUsed, usedDate) VALUES (#{userId}, #{couponId}, #{isUsed}, #{usedDate})")
    void insertUserCoupon(UserCoupon userCoupon);

    @Update("UPDATE UserCoupon SET isUsed = true, usedDate = NOW() WHERE userCouponId = #{userCouponId}")
    void updateUserCoupon(UserCoupon userCoupon);
}
