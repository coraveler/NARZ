package com.kdt_final.back.comment.domain;

import lombok.Data;

@Data
public class CommentResponseDTO {
    private Integer commentId;
    private Integer userId;
    private String comment;
    private String createdDate;
}
