package com.kdt_final.back.ranking.domain.totalranker;

import lombok.Data;

@Data
public class TotalRankerResponseDTO {
    private String author;
    private int firstCount;
    private int secondCount;
    private int thirdCount;
}
