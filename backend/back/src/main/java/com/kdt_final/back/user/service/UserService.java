package com.kdt_final.back.user.service;

import com.kdt_final.back.user.dao.UserRepository;
import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.LoginResponseDTO;
import com.kdt_final.back.user.dto.UserDTO;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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

        for (User user : userAll) {
            UserDTO.UserResponseDTO userResponseDTO = UserDTO.UserResponseDTO.builder()
                    .userId(user.getUserId())
                    .loginId(user.getLoginId())
                    .userName(user.getUserName())
                    .email(user.getEmail())
                    .userNickname(user.getUserNickname())
                    .build();
            userResponseDTOS.add(userResponseDTO);
        }

        return userResponseDTOS;
    }


    public void creatUser(UserDTO.UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setLoginId(userRequestDTO.getLoginId());
        user.setUserName(userRequestDTO.getUserName());
        user.setPassword(userRequestDTO.getPassword());
        user.setEmail(userRequestDTO.getEmail());
        user.setUserNickname(userRequestDTO.getUserNickname());
        user.setPhoneNum(userRequestDTO.getPhoneNum());


        userRepository.createUser(user);

    }

    public Boolean checkDuplicateUserNickName(String userNickname) {
        List<User> allByUserNickname = userRepository.findAllByUserNickname(userNickname);

        if (allByUserNickname == null || allByUserNickname.isEmpty()) {
            return true;
        }
        return false;

    }

    public Boolean checkDuplicateLoginId(String loginId) {
        List<User> allByLoginId = userRepository.findAllByLoginId(loginId);
        if (allByLoginId == null || allByLoginId.isEmpty()) {
            return true;
        }
        return false;
    }

   /* public LoginResponseDTO login(UserDTO.UserRequestDTO userRequestDTO) {

        User user = new User();
        UserDTO.UserResponseDTO userResponseDTO = new UserDTO.UserResponseDTO();
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();

        user.setLoginId(userRequestDTO.getLoginId());
        user.setPassword(userRequestDTO.getPassword());

        User loginStatus = userRepository.findUserByLoginId(user);
        if (loginStatus == null) {
            loginResponseDTO.setSetLogin(false);
            return loginResponseDTO;
        } else {
            loginResponseDTO.setSetLogin(true);
            userResponseDTO.setLoginId(loginStatus.getLoginId());
            return loginResponseDTO;

        }


    }*/

    public LoginResponseDTO login(UserDTO.UserRequestDTO userRequestDTO) {

        String loginId = userRequestDTO.getLoginId();
        String password = userRequestDTO.getPassword();
        User user = userRepository.findByLoginIdAndPassword(loginId,password);

        if (user == null) {
            return LoginResponseDTO
                    .builder()
                    .isLogin(false)
                    .build();
        } else {
            // 쿠키 생성

            UserDTO.UserResponseDTO userResponseDTO = UserDTO.UserResponseDTO.builder()
                    .loginId(user.getLoginId())
                    .userNickname(user.getUserNickname())
                    .email(user.getEmail())
                    .phoneNum(user.getPhoneNum())
                    .userName(user.getUserName())
                    .build();
            LoginResponseDTO loginResponseDTO = LoginResponseDTO.builder()
                    .isLogin(true)
                    .userResponseDTO(userResponseDTO)
                    .build();
            return loginResponseDTO;
        }
    }


        public void updateUser (UserDTO.UserRequestDTO userRequestDTO){
            User user = new User();

        }
    }
