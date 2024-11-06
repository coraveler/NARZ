package com.kdt_final.back.ranking.domain;

import lombok.Data;

@Data
public class RankingResponseDTO {
    private int rank;
    private String author;
    private String board;
    private int likes;
    private int postCount;
    private int commentCount;
}
