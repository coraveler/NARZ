package com.kdt_final.back.ranking.service;

import com.kdt_final.back.ranking.domain.RankingRequestDTO;
import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import com.kdt_final.back.ranking.dao.RankingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
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

    /**
     * 매주 월요일 오전 10시에 주간 랭킹 초기화
     */
    @Scheduled(cron = "0 0 10 * * MON")
    public void resetWeeklyRanking() {
        rankingMapper.clearWeeklyRanking();

        List<RankingResponseDTO> newPopularPosts = getPopularPostRankings();
        List<RankingResponseDTO> newUserActivityRankings = getUserActivityRankings();

        newPopularPosts.forEach(post -> {
            RankingRequestDTO requestDTO = new RankingRequestDTO();
            requestDTO.setRankType("인기 게시글 랭킹");
            addRanking(requestDTO);
        });

        newUserActivityRankings.forEach(activity -> {
            RankingRequestDTO requestDTO = new RankingRequestDTO();
            requestDTO.setRankType("유저 활동 랭킹");
            addRanking(requestDTO);
        });
    }
}
