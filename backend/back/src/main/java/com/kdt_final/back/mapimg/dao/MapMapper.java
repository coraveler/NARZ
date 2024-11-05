package com.kdt_final.back.mapimg.dao;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.mapimg.domain.LikeCountRequestDTO;

@Mapper
public interface MapMapper {
    
    public Integer getLikeCount(LikeCountRequestDTO params);
}
