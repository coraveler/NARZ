package com.kdt_final.back.mapshare.domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class MapShareResponseDTO {
    private int mapId;
    private String userNickname;
    private String mapImgUrl;
    private LocalDateTime createdDate;
    private int userId;
}
