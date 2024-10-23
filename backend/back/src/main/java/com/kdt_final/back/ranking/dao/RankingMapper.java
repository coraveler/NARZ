package com.kdt_final.back.ranking.dao;

import com.kdt_final.back.ranking.domain.RankingResponseDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RankingMapper {

    List<RankingResponseDTO> getPopularPostRankings();

    List<RankingResponseDTO> getUserActivityRankings();

    List<RankingResponseDTO> getHallOfFame();
}

