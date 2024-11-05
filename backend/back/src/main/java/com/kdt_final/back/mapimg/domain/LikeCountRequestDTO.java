package com.kdt_final.back.mapimg.domain;

import lombok.Data;

@Data
public class LikeCountRequestDTO {
    private String local;
    private Integer userId;
}
