package com.kdt_final.back.follow.service;

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

}
