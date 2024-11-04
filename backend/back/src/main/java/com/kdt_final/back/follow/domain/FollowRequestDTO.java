package com.kdt_final.back.follow.domain;

import lombok.Data;

@Data
public class FollowRequestDTO {
    private Integer followedId;
    private Integer followerId;
}
