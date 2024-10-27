package com.kdt_final.back.user.service;

import com.kdt_final.back.user.dao.UserRepository;
import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDTO.UserResponseDTO> findUserAll() {
        List<User> userAll = userRepository.findUserAll();

        List<UserDTO.UserResponseDTO> userResponseDTOS = new ArrayList<>();

        for(User user : userAll) {
            UserDTO.UserResponseDTO userResponseDTO = UserDTO.UserResponseDTO.builder()
                    .userId(user.getUserId())
                    .userName(user.getUserName())
                    .email(user.getEmail())
                    .userNickname(user.getUserNickname())
                    .build();
            userResponseDTOS.add(userResponseDTO);
        }

        return userResponseDTOS;
    }
}
