package com.kdt_final.back.ranking.domain;

import lombok.Data;

@Data
public class RankingResponseDTO {
    private int rank;
    private String author;
    private String board;  // 게시판 (인기 게시글 랭킹에만 사용)
    private double rating;  // 평점 (인기 게시글 랭킹에만 사용)
    private int views;      // 조회수 (인기 게시글 랭킹에만 사용)
    private int likes;      // 좋아요 수 (인기 게시글 랭킹에만 사용)
    private int postCount;  // 게시물 수 (유저 활동 랭킹에만 사용)
    private int commentCount; // 댓글 수 (유저 활동 랭킹에만 사용)
}
