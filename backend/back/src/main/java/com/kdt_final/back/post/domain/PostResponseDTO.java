package com.kdt_final.back.post.domain;

import lombok.Data;

@Data
public class PostResponseDTO {
    private Integer postId;
    private String userId;
    private String local;
    private String title;
    private String content;
    private Double rating;
    private Integer secret;
    private String headerImg;
    private String createdDate;

    private int likeCount;
}
