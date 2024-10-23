package com.kdt_final.back.shop.dao;

import com.kdt_final.back.shop.domain.MileageHistory;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MileageHistoryMapper {
    void insertHistory(MileageHistory history);  // 마일리지 내역 추가

    List<MileageHistory> getHistoryByUser(String userId);  // 특정 유저의 마일리지 내역 조회

    List<MileageHistory> getAllHistories();  // 모든 마일리지 내역 조회
}
