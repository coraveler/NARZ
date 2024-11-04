package com.kdt_final.back.follow.dao;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.follow.domain.FollowRequestDTO;

@Mapper
public interface FollowMapper {
    
    public void saveFollow(FollowRequestDTO params);
    
    public Integer checkFollow(FollowRequestDTO params);

    public void deleteFollow(FollowRequestDTO params);
}
