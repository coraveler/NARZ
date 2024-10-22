package com.kdt_final.back.shop.ctrl;

import com.kdt_final.back.shop.domain.MileageHistory;
import com.kdt_final.back.shop.service.MileageHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ShopController {

    @Autowired
    private MileageHistoryService mileageHistoryService;

    @GetMapping("/mileage-history")
    public List<MileageHistory> getMileageHistory() {
        return mileageHistoryService.getAllHistories();  // 모든 마일리지 내역 반환
    }

    @PostMapping("/mileage-history")
    public MileageHistory addMileageHistory(@RequestBody MileageHistory history) {
        return mileageHistoryService.addHistory(history);  // 마일리지 내역 추가
    }
}
