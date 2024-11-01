package com.kdt_final.back.Shop.service;

import com.kdt_final.back.Shop.dao.MileageMapper;
import com.kdt_final.back.Shop.domain.Mileage;
import com.kdt_final.back.Shop.domain.MileageHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MileageService {
    private final MileageMapper mileageMapper;

    @Autowired
    public MileageService(MileageMapper mileageMapper) {
        this.mileageMapper = mileageMapper;
    }

    public Mileage getMileageByUserId(int userId) {
        return mileageMapper.getMileageByUserId(userId);
    }

    public void addMileage(Mileage mileage) {
        mileageMapper.insertMileage(mileage);
    }

    public List<MileageHistory> getMileageHistory(int userId) {
        return mileageMapper.getMileageHistoryByUserId(userId);
    }


    public void addMileageHistory(MileageHistory mileageHistory) {
    }
}
