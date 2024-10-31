package com.kdt_final.back.user.dto;


import lombok.*;

@Setter
@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {

    public Boolean isLogin;
    public UserDTO.UserResponseDTO userResponseDTO;
}
