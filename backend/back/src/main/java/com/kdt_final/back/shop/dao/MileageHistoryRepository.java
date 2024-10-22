package com.kdt_final.back.shop.dao;

import com.kdt_final.back.shop.domain.MileageHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MileageHistoryRepository extends JpaRepository<MileageHistory, Long> {
    // 추가적인 쿼리 메소드 작성 가능
}
