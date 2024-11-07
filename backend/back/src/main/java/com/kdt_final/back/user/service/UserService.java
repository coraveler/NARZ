package com.kdt_final.back.user.service;

import com.kdt_final.back.user.dao.UserRepository;
import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.LoginResponseDTO;
import com.kdt_final.back.user.dto.UpdateResponseDTO;
import com.kdt_final.back.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

//회원가입
    public Boolean creatUser(UserDTO.UserRequestDTO userRequestDTO) {


        if(userRequestDTO.getUserNickname().equals((checkDuplicateUserNickName(userRequestDTO.getUserNickname())))){
            return false;
        }
       else if(userRequestDTO.getLoginId().equals(checkDuplicateLoginId(userRequestDTO.getLoginId()))) {
            return false;
        }
        else if (!userRequestDTO.getLoginId().matches("^[a-zA-Z0-9]*$")) {
            return false;
        }

        else if (!userRequestDTO.getPassword().matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")) {
            return false;
        }

        else if (!userRequestDTO.getPassword().equals(userRequestDTO.getPasswordConfirm())) {
            return false;

        }

       else if (!userRequestDTO.getUserName().matches("^[가-힣]+$")) {
            return false;
        }
        else if (userRequestDTO.getPhoneNum().matches( "/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/")) {
            return false;
        }
        else if (!userRequestDTO.getEmail().matches("^[\\w-\\.]+@[\\w-]+\\.[a-zA-Z]{2,}$")) {
            return false;
        }
        else{
            User user = new User();
            user.setLoginId(userRequestDTO.getLoginId());
            user.setUserName(userRequestDTO.getUserName());
            user.setPassword(userRequestDTO.getPassword());
            user.setEmail(userRequestDTO.getEmail());
            user.setUserNickname(userRequestDTO.getUserNickname());
            user.setPhoneNum(userRequestDTO.getPhoneNum());
            user.setBirthday(userRequestDTO.getBirthday());


            userRepository.createUser(user);



            return true;
        }



    }
//닉네임 중복체크
    public Boolean checkDuplicateUserNickName(String userNickname) {
        List<User> allByUserNickname = userRepository.findAllByUserNickname(userNickname);

        if (allByUserNickname == null || allByUserNickname.isEmpty()) {
            return true;
        }
        return false;

    }
//아이디 중복체크
    public Boolean checkDuplicateLoginId(String loginId) {
        List<User> allByLoginId = userRepository.findAllByLoginId(loginId);
        if (allByLoginId == null || allByLoginId.isEmpty()) {
            return true;
        }
        return false;
    }
//이메일 중복체크
    public Boolean checkDuplicateEmail(String email) {
        List<User> allByEmail = userRepository.findAllByUserEmail(email);
        if (allByEmail == null || allByEmail.isEmpty()) {
            return true;
        }
        return false;
    }

//로그인
    public LoginResponseDTO login(UserDTO.UserRequestDTO userRequestDTO) {

        String loginId = userRequestDTO.getLoginId();
        String password = userRequestDTO.getPassword();
        User user = userRepository.findByLoginIdAndPassword(loginId, password);

        if (user == null) {
            return LoginResponseDTO
                    .builder()
                    .isLogin(false)
                    .build();
        } else {


            UserDTO.UserResponseDTO userResponseDTO = UserDTO.UserResponseDTO.builder()
                    .userId(user.getUserId())
                    .loginId(user.getLoginId())
                    .userNickname(user.getUserNickname())
                    .email(user.getEmail())
                    .phoneNum(user.getPhoneNum())
                    .userName(user.getUserName())
                    .birthday(user.getBirthday())
                    .build();
            LoginResponseDTO loginResponseDTO = LoginResponseDTO.builder()
                    .isLogin(true)
                    .userResponseDTO(userResponseDTO)
                    .build();
            return loginResponseDTO;
        }
    }

//회원정보수정
    public UpdateResponseDTO updateUser(UserDTO.UserRequestDTO userDTO) {

        if (!userDTO.getEmail().matches("^[\\w-\\.]+@[\\w-]+\\.[a-zA-Z]{2,}$")) {
            return UpdateResponseDTO
                    .builder()
                    .isUpdate(false)
                    .build();
        } else if (!userDTO.getPhoneNum().matches("^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$")) {
            return UpdateResponseDTO
                    .builder()
                    .isUpdate(false)
                    .build();
        } else {
            User user = new User();

            user.setLoginId(userDTO.getLoginId());
            user.setUserName(userDTO.getUserName());
            user.setPassword(userDTO.getPassword());
            user.setEmail(userDTO.getEmail());
            user.setUserNickname(userDTO.getUserNickname());
            user.setPhoneNum(userDTO.getPhoneNum());
            user.setBirthday(userDTO.getBirthday());


            userRepository.updateUser(user);


                UserDTO.UserResponseDTO userResponseDTO = UserDTO.UserResponseDTO.builder()
                        .userId(user.getUserId())
                        .loginId(user.getLoginId())
                        .userNickname(user.getUserNickname())
                        .email(user.getEmail())
                        .phoneNum(user.getPhoneNum())
                        .userName(user.getUserName())
                        .birthday(user.getBirthday())
                        .build();
                UpdateResponseDTO updateResponseDTO = UpdateResponseDTO.builder()
                        .isUpdate(true)
                        .userResponseDTO(userResponseDTO)
                        .build();
                return updateResponseDTO;


        }
    }

    public UserDTO.UserResponseDTO getUserInfo(Integer userId){
        User user = userRepository.getUserInfo(userId); // User 객체를 가져옴
        // if (user == null) {
        //     throw new UserNotFoundException("User not found");
        // }
        return UserDTO.UserResponseDTO.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userNickname(user.getUserNickname())
                .build();
    }


//비빌번호 재설정 아이디/메일로 회원 유무 확인
    public Boolean checkUser(UserDTO.UserRequestDTO userDTO) {


        String loginId = userDTO.getLoginId();
        String email = userDTO.getEmail();
        User loginResult = userRepository.findUserByLoginIdAndEmail(loginId, email);

        if ( loginResult==null ) {
            return false;
        }
        else return true;
    }

//인증코드 확인
    public Boolean checkUserCode(UserDTO.UserRequestDTO userDTO) {
        String loginId = userDTO.getLoginId();
        String userCode = userDTO.getUserCode();

        User user=userRepository.findCodeByLoginId(loginId,userCode);

        if (userCode.equals(user.getUserCode())) {
            return true;
        }
        else return false;
    }


//비밀번호재설정
    public UpdateResponseDTO updatePassword(UserDTO.UserRequestDTO userDTO) {

        if (!userDTO.getPassword().matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")) {
            return UpdateResponseDTO
                    .builder()
                    .isUpdate(false)
                    .build();
        } else if (!userDTO.getPasswordConfirm().equals(userDTO.getPassword())) {
            return UpdateResponseDTO
                    .builder()
                    .isUpdate(false)
                    .build();
        } else {

            String loginId = userDTO.getLoginId();
            String password = userDTO.getPassword();


            Integer updatePwResult = userRepository.updatePassword(loginId, password);

            if (updatePwResult == 1) {
                deleteCode(loginId);//DB에 저장된 인증코드 삭제

                return UpdateResponseDTO
                        .builder()
                        .isUpdate(true)
                        .build();

            } else return UpdateResponseDTO
                    .builder()
                    .isUpdate(false)
                    .build();
        }

    }

//DB에 저장된 인증번호 삭제
        public void deleteCode (String loginId){

            userRepository.deleteCode(loginId);

        }


}
