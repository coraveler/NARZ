    package com.kdt_final.back.shop.dao;

    import org.apache.ibatis.annotations.Mapper;
    import org.apache.ibatis.annotations.Param;
    import org.apache.ibatis.annotations.Select;

    @Mapper
    public interface CouponMapper {
        @Select("SELECT points FROM coupon WHERE couponCode = #{couponCode}")
        Integer getPointsByCouponCode(@Param("couponCode") String couponCode);
    }
