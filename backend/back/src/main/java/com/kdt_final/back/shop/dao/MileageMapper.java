package com.kdt_final.back.shop.dao;

import com.kdt_final.back.ranking.domain.product.ProductRequestDTO;
import com.kdt_final.back.shop.domain.Mileage;
import com.kdt_final.back.shop.domain.MileageHistory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MileageMapper {
    List<Mileage> getMileageByUserId(int userId); // 특정 사용자 ID에 대한 마일리지 조회

    void insertMileage(Mileage mileage); // 마일리지 추가

    void insertMileageHistory(MileageHistory mileageHistory); // 마일리지 내역 추가

    // 사용자별 총 마일리지 계산 메서드
    int getTotalMileage(int userId);

    // MileageHistory 관련 메서드
    List<MileageHistory> getMileageHistoryByUserId(@Param("userId") int userId); // 사용자 ID에 따른 마일리지 내역 조회

    void deductMileage(@Param("userId") int userId, @Param("points") int points); // 마일리지 차감 메서드 추가

    void saveProduct(ProductRequestDTO params);
}
