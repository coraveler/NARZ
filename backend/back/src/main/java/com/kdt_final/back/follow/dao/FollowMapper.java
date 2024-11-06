package com.kdt_final.back.follow.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.follow.domain.FollowRequestDTO;

@Mapper
public interface FollowMapper {
    
    public void saveFollow(FollowRequestDTO params);
    
    public Integer checkFollow(FollowRequestDTO params);

    public void deleteFollow(FollowRequestDTO params);

    public List<Integer> getFollowers(Integer userId);

    public List<Integer> getFollowings(Integer userId);

    public Integer countFollower(Integer userId);

    public Integer countFollowing(Integer userId);
}
