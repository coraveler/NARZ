package com.kdt_final.back.festival.domain;

import lombok.Data;

@Data
public class CreateFestivalDTO {
    private String fstvlNm;
    private String opar;
    private String fstvlStartDate;
    private String fstvlEndDate;
    private String fstvlCo;
    private String mnnstNm;
    private String auspcInsttNm;
    private String suprtInsttNm;
    private String phoneNumber;
    private String homepageUrl;
    private String relateInfo;
    private String rdnmadr;
    private String lnmadr;
    private double latitude;
    private double longitude;
    private String referenceDate;
    private String insttCode;
    
}
