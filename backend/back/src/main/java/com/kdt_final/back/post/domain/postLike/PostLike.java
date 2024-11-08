package com.kdt_final.back.post.domain.postLike;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer likeNo;

    @Column(nullable = false)
    private Integer postId;

    @Column(nullable = false)
    private Integer userId;
}