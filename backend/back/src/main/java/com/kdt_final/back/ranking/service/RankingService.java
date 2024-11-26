package com.kdt_final.back.ranking.service;

import com.kdt_final.back.ranking.domain.RankingRequestDTO;
import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import com.kdt_final.back.ranking.domain.totalranker.TotalRankerResponseDTO;
import com.kdt_final.back.ranking.domain.userinfo.UserInfoResponseDTO;
import com.kdt_final.back.shop.dao.MileageMapper;
import com.kdt_final.back.shop.domain.MileageHistory;
import com.kdt_final.back.ranking.dao.RankingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RankingService {

    @Autowired
    private RankingMapper rankingMapper;
    @Autowired
    private MileageMapper mileageMapper;

    /**
     * 주간 랭킹 초기화 (월요일 오전 10시)
     */
    @Scheduled(cron = "0 0 0 * * MON")
    public void resetWeeklyRanking() {
        // System.out.println("랭킹 집계 및 마일리지 지급 실행!!!!!");
        String currentWeek = getCurrentWeek();

        List<RankingResponseDTO> postRankUser = getPopularPostRankings();
        List<RankingResponseDTO> userRankUser = getUserActivityRankings();

        RankingRequestDTO params = new RankingRequestDTO();
        UserInfoResponseDTO userInfo = new UserInfoResponseDTO();
        MileageHistory mileage = new MileageHistory();

        // postRankUser의 첫 3개의 항목만 DB에 저장
        for (int i = 0; i < Math.min(3, postRankUser.size()); i++) {
            RankingResponseDTO ranking = postRankUser.get(i);
            // 랭킹 타입 'popularPost'와 'ranking' 정보 등 저장
            params.setAuthor(ranking.getAuthor());
            params.setRankType("popularPost");
            params.setWeekOf(currentWeek);
            params.setRanking(i + 1);
            rankingMapper.saveRankUser(params);
            userInfo = rankingMapper.getUserInfo(params.getAuthor());
            mileage.setUserId(userInfo.getUserId());
            int price =1000;
            if(i==1){price = 500;}
            else if(i==2){price = 300;}
            mileage.setMileagePoints(price);
            mileage.setDescription("주간 인기 게시글 "+ (i+1)+"등!!!");
            mileageMapper.insertMileageHistory(mileage);
        }

        // userRankUser의 첫 3개의 항목만 DB에 저장
        for (int i = 0; i < Math.min(3, userRankUser.size()); i++) {
            RankingResponseDTO ranking = userRankUser.get(i);
            // 랭킹 타입 'userActivity'와 'ranking' 정보 등 저장
            params.setAuthor(ranking.getAuthor());
            params.setRankType("userActivity");
            params.setWeekOf(currentWeek);
            params.setRanking(i + 1);
            // System.out.println(params);
            rankingMapper.saveRankUser(params);
            userInfo = rankingMapper.getUserInfo(params.getAuthor());
            mileage.setUserId(userInfo.getUserId());
            int price =1000;
            if(i==1){price = 500;}
            else if(i==2){price = 300;}
            mileage.setMileagePoints(price);
            mileage.setDescription("주간 활동 랭킹 "+ (i+1)+"등!!!");
            mileageMapper.insertMileageHistory(mileage);
        }

        rankingMapper.clearWeeklyRanking();
    }

    /**
     * 주간 랭킹 데이터 추가 (5분마다 실행)
     */
    @Scheduled(cron = "0 * * * * *")
    public void addWeeklyRankingData() {
        // System.out.println("주간 랭킹 데이터 추가 >>>>");

        String currentWeek = getCurrentWeek();
        // System.out.println("현재 주차: " + currentWeek);

        rankingMapper.clearWeeklyRanking();

        // 인기 게시글 랭킹 추가
        addPostRanking(currentWeek);
        // 유저 랭킹 추가
        addUserRanking(currentWeek);
        // List<RankingResponseDTO> newPopularPosts = getPopularPostRankings();
        // System.out.println("asdasd"+newPopularPosts);
        // newPopularPosts.forEach(post -> {
        // RankingRequestDTO requestDTO = new RankingRequestDTO();
        // requestDTO.setRankType("popularPost");
        // requestDTO.setAuthor(post.getAuthor());
        // requestDTO.setBoard(post.getBoard());
        // requestDTO.setLikes(post.getLikes());
        // requestDTO.setWeekOf(currentWeek);
        // rankingMapper.addRanking(requestDTO);
        // System.out.println("Added Popular Post Ranking: " + requestDTO);
        // });

        // // 유저 활동 랭킹 추가
        // List<RankingResponseDTO> newUserActivityRankings = getUserActivityRankings();
        // newUserActivityRankings.forEach(activity -> {
        // RankingRequestDTO requestDTO = new RankingRequestDTO();
        // requestDTO.setRankType("userActivity");
        // requestDTO.setAuthor(activity.getAuthor());
        // requestDTO.setPostCount(activity.getPostCount());
        // requestDTO.setCommentCount(activity.getCommentCount());
        // requestDTO.setWeekOf(currentWeek);
        // rankingMapper.addRanking(requestDTO);
        // System.out.println("Added User Activity Ranking: " + requestDTO);
        // });

        System.out.println("주간 랭킹 데이터 추가 완료 >>>>");
    }

    // 인기 게시글 랭킹 가져오기
    public List<RankingResponseDTO> getPopularPostRankings() {
        String currentWeek = getCurrentWeek();
        // System.out.println("Fetching Popular Posts for week: " + currentWeek);
        // System.out.println(rankingMapper.getPopularPostRankings(currentWeek));
        return rankingMapper.getPopularPostRankings(currentWeek);
    }

    // 유저 활동 랭킹 가져오기
    public List<RankingResponseDTO> getUserActivityRankings() {
        String currentWeek = getCurrentWeek();
        // System.out.println("Fetching User Activity Rankings for week: " + currentWeek);
        return rankingMapper.getUserActivityRankings(currentWeek);
    }

    // 명예의 전당 가져오기
    public List<RankingResponseDTO> getHallOfFame() {
        String currentWeek = getCurrentWeek();
        // System.out.println("Fetching Hall of Fame for week: " + currentWeek);
        return rankingMapper.getHallOfFame(currentWeek);
    }

    // 랭킹 추가
    public void addRanking(RankingRequestDTO rankingRequestDTO) {
        System.out.println(rankingRequestDTO);
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
        // 현재 시간에서 4분을 빼서 LocalDateTime으로 구하기
        LocalDateTime currentDateTime = LocalDateTime.now().minusMinutes(3);

        // 4분을 뺀 날짜 기준으로 이번 주 월요일 구하기
        return currentDateTime.with(DayOfWeek.MONDAY).toLocalDate().toString();
    }

    public void addPostRanking(String currentWeek) {
        List<RankingRequestDTO> params = rankingMapper.addPostRanking(currentWeek);
        for (RankingRequestDTO rankingRequestDTO : params) {
            rankingRequestDTO.setRankType("popularPost");
            rankingRequestDTO.setWeekOf(currentWeek);
            addRanking(rankingRequestDTO);
        }
    }

    public void addUserRanking(String currentWeek) {
        List<RankingRequestDTO> params = rankingMapper.addUserRanking(currentWeek);
        for (RankingRequestDTO rankingRequestDTO : params) {
            rankingRequestDTO.setRankType("userActivity");
            rankingRequestDTO.setWeekOf(currentWeek);
            addRanking(rankingRequestDTO);
        }
    }

    public List<TotalRankerResponseDTO> totalRank() {
        List<TotalRankerResponseDTO> lst = rankingMapper.getRankCount();
        // lst를 정렬: firstCount → secondCount → thirdCount 기준으로 내림차순 정렬
        lst.sort((a, b) -> {
            if (b.getFirstCount() != a.getFirstCount()) {
                return b.getFirstCount() - a.getFirstCount(); // firstCount 내림차순
            } else if (b.getSecondCount() != a.getSecondCount()) {
                return b.getSecondCount() - a.getSecondCount(); // secondCount 내림차순
            } else {
                return b.getThirdCount() - a.getThirdCount(); // thirdCount 내림차순
            }
        });

        // 상위 3개의 결과만 반환
        return lst.stream()
                .limit(3) // 최대 3개의 요소만
                .collect(Collectors.toList());
    }

    public UserInfoResponseDTO getUserInfo(String author){
        return rankingMapper.getUserInfo(author);
    }
}
