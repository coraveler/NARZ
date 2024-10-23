package com.kdt_final.back.ranking.ctrl;


import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import com.kdt_final.back.ranking.domain.RankingRequestDTO;
import com.kdt_final.back.ranking.service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rankings")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    @GetMapping
    public ResponseEntity<List<RankingResponseDTO>> getRankings(@RequestParam String rankingType) {
        List<RankingResponseDTO> rankings = rankingService.getRankings(rankingType);
        return ResponseEntity.ok(rankings);
    }
}
