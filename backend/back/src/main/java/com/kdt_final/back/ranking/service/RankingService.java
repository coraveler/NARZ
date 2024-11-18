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

    // 인기 게시글 랭킹 가져오기
    public List<RankingResponseDTO> getPopularPostRankings() {
        LocalDate currentWeek;

        // 현재 시간 확인 (10시 이전이면 지난 주, 10시 이후면 이번 주)
        if (LocalTime.now().isBefore(LocalTime.of(10, 0))) {
            // 현재 시간이 오전 10시 이전이면, 지난 주 월요일 날짜
            currentWeek = LocalDate.now().minusWeeks(1).with(DayOfWeek.MONDAY);
        } else {
            // 현재 시간이 오전 10시 이후면, 이번 주 월요일 날짜
            currentWeek = LocalDate.now().with(DayOfWeek.MONDAY);
        }

        System.out.println("Fetching Popular Post Rankings for week: " + currentWeek);  // 현재 주 로그 추가
        List<RankingResponseDTO> rankings = rankingMapper.getPopularPostRankings(currentWeek.toString());
        System.out.println("Fetched Popular Post Rankings: " + rankings);  // 쿼리 결과 출력
        return rankings;
    }

    // 유저 활동 랭킹 가져오기
    public List<RankingResponseDTO> getUserActivityRankings() {
        LocalDate currentWeek;

        // 현재 시간 확인 (10시 이전이면 지난 주, 10시 이후면 이번 주)
        if (LocalTime.now().isBefore(LocalTime.of(10, 0))) {
            // 현재 시간이 오전 10시 이전이면, 지난 주 월요일 날짜
            currentWeek = LocalDate.now().minusWeeks(1).with(DayOfWeek.MONDAY);
        } else {
            // 현재 시간이 오전 10시 이후면, 이번 주 월요일 날짜
            currentWeek = LocalDate.now().with(DayOfWeek.MONDAY);
        }

        List<RankingResponseDTO> rankings = rankingMapper.getUserActivityRankings(currentWeek.toString());
        System.out.println("Fetched User Activity Rankings: " + rankings);  // 로그 추가
        return rankings;
    }

    // 명예의 전당 가져오기
    public List<RankingResponseDTO> getHallOfFame() {
        LocalDate currentWeek;

        // 현재 시간 확인 (10시 이전이면 지난 주, 10시 이후면 이번 주)
        if (LocalTime.now().isBefore(LocalTime.of(10, 0))) {
            // 현재 시간이 오전 10시 이전이면, 지난 주 월요일 날짜
            currentWeek = LocalDate.now().minusWeeks(1).with(DayOfWeek.MONDAY);
        } else {
            // 현재 시간이 오전 10시 이후면, 이번 주 월요일 날짜
            currentWeek = LocalDate.now().with(DayOfWeek.MONDAY);
        }

        List<RankingResponseDTO> rankings = rankingMapper.getHallOfFame(currentWeek.toString());
        System.out.println("Fetched Hall of Fame Rankings: " + rankings);  // 로그 추가
        return rankings;
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
     * 매주 월요일 오전 10시에 주간 랭킹 초기화
     */
    @Scheduled(cron = "0 0 10 * * MON")
    public void resetWeeklyRanking() {
        System.out.println("Resetting weekly ranking...");  // 로그 추가

        // 주간 랭킹 초기화
        rankingMapper.clearWeeklyRanking();

        // 현재 주의 날짜
        LocalDate currentWeek = LocalDate.now();
        System.out.println("Current Week: " + currentWeek);  // 로그 추가

        // 인기 게시글 랭킹과 유저 활동 랭킹 가져오기
        List<RankingResponseDTO> newPopularPosts = getPopularPostRankings();
        List<RankingResponseDTO> newUserActivityRankings = getUserActivityRankings();

        // 인기 게시글 랭킹을 weeklyranking 테이블에 추가
        newPopularPosts.forEach(post -> {
            RankingRequestDTO requestDTO = new RankingRequestDTO();
            requestDTO.setRankType("popularPost");
            requestDTO.setAuthor(post.getAuthor());
            requestDTO.setBoard(post.getBoard());
            requestDTO.setLikes(post.getLikes());
            requestDTO.setWeekOf(currentWeek.toString());  // 현재 주의 날짜를 weekOf에 설정
            rankingMapper.addRanking(requestDTO);
            System.out.println("Added Popular Post Ranking: " + post);  // 로그 추가
        });

        // 유저 활동 랭킹을 weeklyranking 테이블에 추가
        newUserActivityRankings.forEach(activity -> {
            RankingRequestDTO requestDTO = new RankingRequestDTO();
            requestDTO.setRankType("userActivity");
            requestDTO.setAuthor(activity.getAuthor());
            requestDTO.setPostCount(activity.getPostCount());
            requestDTO.setCommentCount(activity.getCommentCount());
            requestDTO.setWeekOf(currentWeek.toString());  // 현재 주의 날짜를 weekOf에 설정
            rankingMapper.addRanking(requestDTO);
            System.out.println("Added User Activity Ranking: " + activity);  // 로그 추가
        });
    }
}
