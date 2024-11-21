package com.kdt_final.back.follow.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kdt_final.back.follow.dao.FollowMapper;
import com.kdt_final.back.follow.domain.FollowRequestDTO;

@Service
public class FollowService {
    
    @Autowired
    private FollowMapper followMapper;

    public void saveFollow(FollowRequestDTO params){
        followMapper.saveFollow(params);
    }

    public Integer checkFollow(FollowRequestDTO params){
        return followMapper.checkFollow(params);

    }

    public void deleteFollow(FollowRequestDTO params){
        followMapper.deleteFollow(params);
    }

    public List<Integer> getFollowers(Integer userId){
        return followMapper.getFollowers(userId);
    }

    public List<Integer> getFollowings(Integer userId){
        return followMapper.getFollowings(userId);
    }

    public Integer countFollower(Integer userId){
        return followMapper.countFollower(userId);
    }

    public Integer countFollowing(Integer userId){
        return followMapper.countFollowing(userId);
    }

}
