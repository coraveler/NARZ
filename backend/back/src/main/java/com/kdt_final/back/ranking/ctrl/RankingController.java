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

    // 특정 랭킹 타입에 따라 데이터를 가져오는 엔드포인트
    @GetMapping
    public List<RankingResponseDTO> getRankings(@RequestParam(name = "rankType") String rankType) {
       
        if (rankType.equals("인기 게시글 랭킹")) {
            return rankingService.getPopularPostRankings();
        } else if (rankType.equals("유저 활동 랭킹")) {
            return rankingService.getUserActivityRankings();
        } else if (rankType.equals("명예의 전당")) {
            return rankingService.getHallOfFame();
        } else {
            // 잘못된 rankType에 대해 예외를 던지거나 빈 리스트 반환
            return List.of(); // 빈 리스트를 반환하여 오류 방지
        }
    }

    // 기존 메서드들도 함께 사용 가능
    @PostMapping
    public void addRanking(@RequestBody RankingRequestDTO rankingRequestDTO) {
        rankingService.addRanking(rankingRequestDTO);
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
