package com.kdt_final.back.shop.service;

import com.kdt_final.back.shop.dao.MileageMapper;
import com.kdt_final.back.shop.domain.Mileage;
import com.kdt_final.back.shop.domain.MileageHistory;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MileageService {
    private final MileageMapper mileageMapper;

    public MileageService(MileageMapper mileageMapper) {
        this.mileageMapper = mileageMapper;
    }

    public Mileage getMileageByUserId(int userId) {
        return mileageMapper.getMileageByUserId(userId);
    }

    public void addMileage(Mileage mileage) {
        // 마일리지 테이블에 마일리지 적립
        mileageMapper.insertMileage(mileage);

        // 마일리지 히스토리 테이블에 적립 내역 추가
        MileageHistory history = new MileageHistory();
        history.setUserId(mileage.getUserId());
        history.setMileagePoints(mileage.getMileage());
        history.setDescription("쿠폰 적립");
        addMileageHistory(history); // 내역 추가
    }

    public List<MileageHistory> getMileageHistory(int userId) {
        return mileageMapper.getMileageHistoryByUserId(userId);
    }

    public void addMileageHistory(MileageHistory mileageHistory) {
        mileageMapper.insertMileageHistory(mileageHistory);
    }

     // 마일리지 Mapper로 총 마일리지 값 가져오기
     public int getTotalMileage(int userId) {
        Integer totalMileage = mileageMapper.getTotalMileage(userId);
        return totalMileage != null ? totalMileage : 0; // null인 경우 0 반환
    }
}
