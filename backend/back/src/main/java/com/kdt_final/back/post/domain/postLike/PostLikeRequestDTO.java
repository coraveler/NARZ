package com.kdt_final.back.post.domain.postLike;

import lombok.Data;

@Data
public class PostLikeRequestDTO {
    private Integer postId;
    private String userId;
}
