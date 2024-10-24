package com.kdt_final.back.ranking.service;

import com.kdt_final.back.ranking.domain.RankingRequestDTO;
import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import com.kdt_final.back.ranking.dao.RankingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingService {

    @Autowired
    private RankingMapper rankingMapper;

    public List<RankingResponseDTO> getPopularPostRankings() {
        return rankingMapper.getPopularPostRankings();
    }

    public List<RankingResponseDTO> getUserActivityRankings() {
        return rankingMapper.getUserActivityRankings();
    }

    public List<RankingResponseDTO> getHallOfFame() {
        return rankingMapper.getHallOfFame();
    }

    public void addRanking(RankingRequestDTO rankingRequestDTO) {
        rankingMapper.addRanking(rankingRequestDTO);
    }

    public List<RankingResponseDTO> getRankings() {
        return rankingMapper.getRankings();
    }

    public void deleteRanking(int rank) {
        rankingMapper.deleteRanking(rank);
    }

    public RankingResponseDTO getRankingInfo(int rank) {
        return rankingMapper.getRankingInfo(rank);
    }

    public void updateRanking(RankingRequestDTO rankingRequestDTO) {
        rankingMapper.updateRanking(rankingRequestDTO);
    }
}
