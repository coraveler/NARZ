package com.kdt_final.back.Shop.dao;

import com.kdt_final.back.Shop.domain.Mileage;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CouponMapper {
    void addMileage(Mileage mileage);
}
