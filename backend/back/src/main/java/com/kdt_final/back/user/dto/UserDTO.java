package com.kdt_final.back.user.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

public class UserDTO {

    @Setter
    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserRequestDTO{


        public int userId;
        public String loginId;
        public String password;
        public String passwordConfirm;
        public String userName;
        public String userNickname;
        public String email;
        public String birthday;
        public String phoneNum;
        public String userColor;
        public String userCode;
        public String profileImage;
        public String emailCode;
        public String lastActiveDate;
        public LocalDate attendancePointDate;

    }

    @Setter
    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserResponseDTO{

        public int userId;
        public String loginId;
        public String userName;
        public String userNickname;
        public String email;
        public String birthday;
        public String phoneNum;
        public String userColor;
        public String userCode;
        private String achievement;
        public String profileImage;
        public String emailCode;
        public LocalDate lastActiveDate;
        public LocalDate attendancePointDate;


    }
}
