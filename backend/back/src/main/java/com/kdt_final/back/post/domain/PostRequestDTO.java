package com.kdt_final.back.post.domain;


import lombok.Data;

@Data
public class PostRequestDTO {
    private Integer postId;
    private Integer userId;
    private String local;
    private String title;
    private String content;
    private Double rating;
    private Integer secret;
    private String headerImg;
}
