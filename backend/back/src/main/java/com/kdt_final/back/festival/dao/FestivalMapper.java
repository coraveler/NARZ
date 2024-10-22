package com.kdt_final.back.festival.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.festival.domain.CreateFestivalDTO;
import com.kdt_final.back.festival.domain.FestivalResponseDTO;

@Mapper
public interface FestivalMapper {

    public void saveFestival(List<CreateFestivalDTO> list);

    public int deleteAllFestival();

    public List<FestivalResponseDTO> getFestival();

}