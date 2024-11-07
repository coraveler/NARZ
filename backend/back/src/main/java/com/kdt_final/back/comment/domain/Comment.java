package com.kdt_final.back.comment.domain;

import lombok.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;

    @Column(nullable = false)
    private Integer userId;

    @Column(nullable = false)
    private Integer postId;

    @Column(nullable = false, length = 1000)
    private String commentText;

    @Column(nullable = false)
    private LocalDateTime createdDate;
}