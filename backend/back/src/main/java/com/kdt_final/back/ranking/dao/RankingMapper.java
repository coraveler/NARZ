package com.kdt_final.back.ranking.dao;

import com.kdt_final.back.ranking.domain.RankingRequestDTO;
import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import com.kdt_final.back.ranking.domain.totalranker.TotalRankerResponseDTO;
import com.kdt_final.back.ranking.domain.userinfo.UserInfoResponseDTO;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RankingMapper {
    // 인기 게시글 랭킹 가져오기 (주간 데이터를 위해 weekOf 파라미터 추가)
    List<RankingResponseDTO> getPopularPostRankings(String currentWeek);

    // 유저 활동 랭킹 가져오기 (주간 데이터를 위해 weekOf 파라미터 추가)
    List<RankingResponseDTO> getUserActivityRankings(String currentWeek);

    // 명예의 전당 가져오기 (주간 데이터를 위해 weekOf 파라미터 추가)
    List<RankingResponseDTO> getHallOfFame(String currentWeek);

    // 랭킹 추가
    void addRanking(RankingRequestDTO rankingRequestDTO);

    // 모든 랭킹 가져오기
    List<RankingResponseDTO> getRankings();

    // 특정 랭킹 삭제
    void deleteRanking(@Param("rank") int rank);

    // 특정 랭킹 정보 가져오기
    RankingResponseDTO getRankingInfo(@Param("rank") int rank);

    // 랭킹 업데이트
    void updateRanking(RankingRequestDTO rankingRequestDTO);

    // 주간 랭킹 초기화 메서드
    void clearWeeklyRanking();  // 주간 랭킹 초기화 메서드

    // 
    List<RankingRequestDTO> addPostRanking(String currentWeek);
    
    List<RankingRequestDTO> addUserRanking(String currentWeek);

    void saveRankUser(RankingRequestDTO params);

    List<TotalRankerResponseDTO> getRankCount();

    UserInfoResponseDTO getUserInfo(String author);
}
