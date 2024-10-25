package com.kdt_final.back.shop.ctrl;

import com.kdt_final.back.shop.domain.MileageHistory;
import com.kdt_final.back.shop.service.MileageHistoryService;
import io.swagger.v3.oas.annotations.Operation;  
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ShopController {

    @Autowired
    private MileageHistoryService mileageHistoryService;

    @Operation(summary = "마일리지 내역 추가", description = "새로운 마일리지 내역을 추가합니다.")
    @PostMapping("/mileage-history")
    public void addMileageHistory(@RequestBody MileageHistory history) {
        mileageHistoryService.addHistory(history);
    }

    @Operation(summary = "특정 유저의 마일리지 내역 조회", description = "특정 유저의 마일리지 내역을 조회합니다.")
    @GetMapping("/mileage-history/{userId}")
    public List<MileageHistory> getMileageHistoryByUser(@PathVariable String userId) {
        return mileageHistoryService.getHistoryByUser(userId);
    }

    @Operation(summary = "모든 마일리지 내역 조회", description = "모든 마일리지 내역을 조회합니다.")
    @GetMapping("/mileage-history")
    public List<MileageHistory> getAllMileageHistories() {
        return mileageHistoryService.getAllHistories();
    }
}
