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
        List<User> allByUserNickname =userRepository.findAllByUserNickname(userNickname);

        if (allByUserNickname==null|| allByUserNickname.isEmpty()) {
            return true;
        }
        return false;

    }

    public Boolean checkDuplicateLoginId(String loginId){
        List <User> allByLoginId = userRepository.findAllByLoginId(loginId);
        if (allByLoginId == null || allByLoginId.isEmpty()){
            return true;
        }
        return false;
    }

    public Boolean login(UserDTO.UserRequestDTO userRequestDTO) {

        User user=new User();
        user.setLoginId(userRequestDTO.getLoginId());
        user.setPassword(userRequestDTO.getPassword());

    List<User> loginStatus=userRepository.login(user);
    if (loginStatus==null || loginStatus.isEmpty()){
        return false;
    }
    return true;
    }
}
