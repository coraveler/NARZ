package com.kdt_final.back.user.service;

import java.util.Set;

public class RegionConstants {
    public static final Set<String> REQUIRED_REGIONS_KR = Set.of(
        "수도권", "강원", "충북", "충남", 
        "대전", "경북", "전북", "전남", "제주"
    );

    public static final Set<String> REQUIRED_REGIONS_EN = Set.of(
        "sudo", "jeonnam", "jeonbuk", "jeju", 
        "gyeongnam", "gyeongbuk", "gangwon", 
        "deajeon", "chungnam", "chungbuk"
    );

    
}