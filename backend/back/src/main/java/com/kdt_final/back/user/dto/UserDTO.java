package com.kdt_final.back.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

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


    }
}
