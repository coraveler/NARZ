package com.kdt_final.back.ranking.ctrl;

import com.kdt_final.back.ranking.domain.RankingRequestDTO;
import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import com.kdt_final.back.ranking.service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rankings")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    @PostMapping
    public void addRanking(@RequestBody RankingRequestDTO rankingRequestDTO) {
        rankingService.addRanking(rankingRequestDTO);
    }

    @GetMapping
    public List<RankingResponseDTO> getRankings() {
        return rankingService.getRankings();
    }

    @DeleteMapping("/{rank}")
    public void deleteRanking(@PathVariable int rank) {
        rankingService.deleteRanking(rank);
    }

    @GetMapping("/{rank}")
    public RankingResponseDTO getRankingInfo(@PathVariable int rank) {
        return rankingService.getRankingInfo(rank);
    }

    @PutMapping
    public void updateRanking(@RequestBody RankingRequestDTO rankingRequestDTO) {
        rankingService.updateRanking(rankingRequestDTO);
    }
}
