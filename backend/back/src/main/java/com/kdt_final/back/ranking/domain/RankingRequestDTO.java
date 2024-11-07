package com.kdt_final.back.ranking.domain;

import lombok.Data;

@Data
public class RankingRequestDTO {
    private String rankType;   // 랭킹 유형 (인기 게시글, 유저 활동)
    private String author;     // 작성자
    private String board;      // 게시글 제목
    private int likes;         // 좋아요 수
    private int postCount;     // 게시물 수
    private int commentCount;  // 댓글 수
    private String weekOf;     // 주차 (DATE 타입으로 주간 랭킹 주차 관리)
}
