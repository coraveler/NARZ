package com.kdt_final.back.shop.ctrl;

import com.kdt_final.back.shop.domain.Mileage;
import com.kdt_final.back.shop.domain.MileageHistory;
import com.kdt_final.back.shop.service.MileageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mileage")
public class MileageController {
    private final MileageService mileageService;

    public MileageController(MileageService mileageService) {
        this.mileageService = mileageService;
    }

    @GetMapping("/{userId}")
    public Mileage getMileage(@PathVariable int userId) {
        return mileageService.getMileageByUserId(userId);
    }

    @PostMapping("/")
    public void addMileage(@RequestBody Mileage mileage) {
        mileageService.addMileage(mileage);
    }

    @PostMapping("/history")
    public void addMileageHistory(@RequestBody MileageHistory mileageHistory) {
        mileageService.addMileageHistory(mileageHistory);
    }

    @GetMapping("/history/{userId}")
    public List<MileageHistory> getMileageHistory(@PathVariable int userId) {
        return mileageService.getMileageHistory(userId);
    }

}
