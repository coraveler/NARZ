package com.kdt_final.back.user.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class User {

    private int userId;
    private String loginId;
    private String password;
    private String userName;
    private String userNickname;
    private String email;
    private String birthday;
    private String phoneNum;
    private String userColor;
    private String userCode;
    private String achievement;
    private String profileImage;
    private String emailCode;
    public String lastActiveDate;
}
