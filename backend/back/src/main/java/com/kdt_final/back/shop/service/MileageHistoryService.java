package com.kdt_final.back.shop.service;

import com.kdt_final.back.shop.dao.MileageHistoryRepository;
import com.kdt_final.back.shop.domain.MileageHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MileageHistoryService {

    @Autowired
    private MileageHistoryRepository repository;

    public List<MileageHistory> getAllHistories() {
        return repository.findAll();  // 모든 마일리지 내역 가져오기
    }

    public MileageHistory addHistory(MileageHistory history) {
        return repository.save(history);  // 마일리지 내역 추가
    }
}
