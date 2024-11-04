package com.kdt_final.back.comment.domain;

import lombok.Data;

@Data
public class CommentRequestDTO {
    private Integer userId;
    private Integer postId;
    private String comment;
    
}
