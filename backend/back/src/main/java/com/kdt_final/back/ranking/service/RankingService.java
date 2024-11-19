package com.kdt_final.back.ranking.service;

import com.kdt_final.back.ranking.domain.RankingRequestDTO;
import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import com.kdt_final.back.ranking.dao.RankingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class RankingService {

    @Autowired
    private RankingMapper rankingMapper;

    /**
     * 주간 랭킹 초기화 (월요일 오전 10시)
     */
    @Scheduled(cron = "0 0 10 * * MON")
    public void resetWeeklyRanking() {
        System.out.println("주간 랭킹 초기화 >>>>");
        rankingMapper.clearWeeklyRanking();
        System.out.println("Weekly rankings cleared.");
    }

    /**
     * 주간 랭킹 데이터 추가 (5분마다 실행)
     */
    @Scheduled(cron = "0 */5 * * * *")
    public void addWeeklyRankingData() {
        System.out.println("주간 랭킹 데이터 추가 >>>>");
        
        String currentWeek = getCurrentWeek();
        System.out.println("현재 주차: " + currentWeek);

        // 인기 게시글 랭킹 추가
        List<RankingResponseDTO> newPopularPosts = getPopularPostRankings();
        newPopularPosts.forEach(post -> {
            RankingRequestDTO requestDTO = new RankingRequestDTO();
            requestDTO.setRankType("popularPost");
            requestDTO.setAuthor(post.getAuthor());
            requestDTO.setBoard(post.getBoard());
            requestDTO.setLikes(post.getLikes());
            requestDTO.setWeekOf(currentWeek);
            rankingMapper.addRanking(requestDTO);
            System.out.println("Added Popular Post Ranking: " + requestDTO);
        });

        // 유저 활동 랭킹 추가
        List<RankingResponseDTO> newUserActivityRankings = getUserActivityRankings();
        newUserActivityRankings.forEach(activity -> {
            RankingRequestDTO requestDTO = new RankingRequestDTO();
            requestDTO.setRankType("userActivity");
            requestDTO.setAuthor(activity.getAuthor());
            requestDTO.setPostCount(activity.getPostCount());
            requestDTO.setCommentCount(activity.getCommentCount());
            requestDTO.setWeekOf(currentWeek);
            rankingMapper.addRanking(requestDTO);
            System.out.println("Added User Activity Ranking: " + requestDTO);
        });

        System.out.println("주간 랭킹 데이터 추가 완료 >>>>");
    }

    // 인기 게시글 랭킹 가져오기
    public List<RankingResponseDTO> getPopularPostRankings() {
        String currentWeek = getCurrentWeek();
        System.out.println("Fetching Popular Posts for week: " + currentWeek);
        System.out.println(rankingMapper.getPopularPostRankings(currentWeek));
        return rankingMapper.getPopularPostRankings(currentWeek);
    }

    // 유저 활동 랭킹 가져오기
    public List<RankingResponseDTO> getUserActivityRankings() {
        String currentWeek = getCurrentWeek();
        System.out.println("Fetching User Activity Rankings for week: " + currentWeek);
        return rankingMapper.getUserActivityRankings(currentWeek);
    }

    // 명예의 전당 가져오기
    public List<RankingResponseDTO> getHallOfFame() {
        String currentWeek = getCurrentWeek();
        System.out.println("Fetching Hall of Fame for week: " + currentWeek);
        return rankingMapper.getHallOfFame(currentWeek);
    }

    // 랭킹 추가
    public void addRanking(RankingRequestDTO rankingRequestDTO) {
        rankingMapper.addRanking(rankingRequestDTO);
    }

    // 모든 랭킹 가져오기
    public List<RankingResponseDTO> getRankings() {
        return rankingMapper.getRankings();
    }

    // 특정 랭킹 삭제
    public void deleteRanking(int rank) {
        rankingMapper.deleteRanking(rank);
    }

    // 특정 랭킹 정보 가져오기
    public RankingResponseDTO getRankingInfo(int rank) {
        return rankingMapper.getRankingInfo(rank);
    }

    // 랭킹 업데이트
    public void updateRanking(RankingRequestDTO rankingRequestDTO) {
        rankingMapper.updateRanking(rankingRequestDTO);
    }

    /**
     * 현재 주차(weekOf) 정보를 반환하는 메서드
     */
    private String getCurrentWeek() {
        // 현재 시간 확인 (10시 이전이면 지난 주, 10시 이후면 이번 주)
        if (LocalTime.now().isBefore(LocalTime.of(10, 0))) {
            // 현재 시간이 오전 10시 이전이면, 지난 주 월요일 날짜 반환
            return LocalDate.now().minusWeeks(1).with(DayOfWeek.MONDAY).toString();
        } else {
            // 현재 시간이 오전 10시 이후면, 이번 주 월요일 날짜 반환
            return LocalDate.now().with(DayOfWeek.MONDAY).toString();
        }
    }
}
