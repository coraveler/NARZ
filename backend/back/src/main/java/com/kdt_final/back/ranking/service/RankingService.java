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
        rankingMapper.clearWeeklyRanking();  // 기존 랭킹 데이터 초기화

        // 인기 게시글 랭킹 가져오기
        List<RankingResponseDTO> newPopularPosts = getPopularPostRankings();
        newPopularPosts.forEach(post -> {
            RankingRequestDTO requestDTO = new RankingRequestDTO();
            requestDTO.setRankType("popularPost");
            requestDTO.setAuthor(post.getAuthor());
            requestDTO.setBoard(post.getBoard());
            requestDTO.setLikes(post.getLikes());
            requestDTO.setWeekOf(getCurrentWeek());  // 현재 주차 (일요일 기준) 설정
            addRanking(requestDTO);
        });

        // 유저 활동 랭킹 가져오기
        List<RankingResponseDTO> newUserActivityRankings = getUserActivityRankings();
        newUserActivityRankings.forEach(activity -> {
            RankingRequestDTO requestDTO = new RankingRequestDTO();
            requestDTO.setRankType("userActivity");
            requestDTO.setAuthor(activity.getAuthor());
            requestDTO.setPostCount(activity.getPostCount());
            requestDTO.setCommentCount(activity.getCommentCount());
            requestDTO.setWeekOf(getCurrentWeek());  // 현재 주차 (일요일 기준) 설정
            addRanking(requestDTO);
        });
    }

    // 현재 주차(weekOf) 정보를 반환하는 메서드 (예: '2024-11-10')
    private String getCurrentWeek() {
        // 여기서는 현재 날짜를 기준으로 주차 정보를 반환하도록 함.
        // 예: '2024-11-10' 형식으로 반환.
        return java.time.LocalDate.now().toString(); 
    }
}
