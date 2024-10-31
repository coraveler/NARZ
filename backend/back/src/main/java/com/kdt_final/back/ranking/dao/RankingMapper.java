package com.kdt_final.back.ranking.dao;

import com.kdt_final.back.ranking.domain.RankingRequestDTO;
import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RankingMapper {

    // 인기 게시글 랭킹 가져오기
    List<RankingResponseDTO> getPopularPostRankings();

    // 유저 활동 랭킹 가져오기
    List<RankingResponseDTO> getUserActivityRankings();

    // 명예의 전당 랭킹 가져오기
    List<RankingResponseDTO> getHallOfFame();
    
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
}
