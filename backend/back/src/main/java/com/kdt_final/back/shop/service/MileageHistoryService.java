package com.kdt_final.back.shop.service;

import com.kdt_final.back.shop.dao.MileageHistoryMapper;
import com.kdt_final.back.shop.domain.MileageHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MileageHistoryService {

    @Autowired
    private MileageHistoryMapper mileageHistoryMapper;

    // 마일리지 내역 추가
    public void addHistory(MileageHistory history) {
        mileageHistoryMapper.insertMileageHistory(history);  // 메소드 이름 변경
    }

    // 특정 유저의 마일리지 내역 조회
    public List<MileageHistory> getHistoryByUser(String userId) {
        return mileageHistoryMapper.findByUserId(userId);  // 메소드 이름 변경
    }

    // 모든 마일리지 내역 조회
    public List<MileageHistory> getAllHistories() {
        // 새로운 메소드 추가
        return mileageHistoryMapper.getAllHistories();
    }
}
