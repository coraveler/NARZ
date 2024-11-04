package com.kdt_final.back.user.dto;

import lombok.*;

@Setter
@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor


public class UpdateResponseDTO {
    public Boolean isUpdate;
    public UserDTO.UserResponseDTO userResponseDTO;
}
