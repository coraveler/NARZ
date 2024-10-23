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
        mileageHistoryMapper.insertHistory(history);
    }

    // 특정 유저의 마일리지 내역 조회
    public List<MileageHistory> getHistoryByUser(String userId) {
        return mileageHistoryMapper.getHistoryByUser(userId);
    }

    // 모든 마일리지 내역 조회
    public List<MileageHistory> getAllHistories() {
        return mileageHistoryMapper.getAllHistories();
    }
}
