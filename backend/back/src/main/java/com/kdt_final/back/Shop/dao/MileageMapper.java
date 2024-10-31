package com.kdt_final.back.Shop.dao;

import com.kdt_final.back.Shop.domain.Mileage;
import com.kdt_final.back.Shop.domain.MileageHistory;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MileageMapper {
    Mileage getMileageByUserId(int userId); // 특정 사용자 ID에 대한 마일리지 조회
    void insertMileage(Mileage mileage);     // 마일리지 추가
    void insertMileageHistory(MileageHistory mileageHistory); // 마일리지 내역 추가

    // MileageHistory 관련 메서드
    List<MileageHistory> getMileageHistoryByUserId(int userId); // 사용자 ID에 따른 마일리지 내역 조회
}
