package com.kdt_final.back.ranking.service;

import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import com.kdt_final.back.ranking.dao.RankingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingService {

    @Autowired
    private RankingMapper rankingMapper;

    public List<RankingResponseDTO> getRankings(String rankingType) {
        switch (rankingType) {
            case "인기 게시글 랭킹":
                return rankingMapper.getPopularPostRankings();
            case "유저 활동 랭킹":
                return rankingMapper.getUserActivityRankings();
            case "명예의 전당":
                return rankingMapper.getHallOfFame();
            default:
                return List.of();
        }
    }
}

