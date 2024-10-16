package com.kdt_final.back.mapimg.dao;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.mapimg.domain.MapRequestDTO;

@Mapper
public class MapMapper {
    
    public void upload(MapRequestDTO params);
}
