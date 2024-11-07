package com.kdt_final.back.user.ctrl;

import com.kdt_final.back.user.dto.LoginResponseDTO;
import com.kdt_final.back.user.dto.UpdateResponseDTO;
import com.kdt_final.back.user.dto.UserDTO;
import com.kdt_final.back.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO.UserResponseDTO>> findUserAll() {

        List<UserDTO.UserResponseDTO> responseDTOS = userService.findUserAll();

        ResponseEntity<List<UserDTO.UserResponseDTO>> responseEntity = ResponseEntity.ok()
                .body(responseDTOS);

        return responseEntity;
    }



//닉네임 중복체크
    @GetMapping("/check/userNickname/{userNickname}")
    public ResponseEntity <Boolean> checkDuplicateUserNickName(@PathVariable("userNickname") String userNickname) {
        System.out.println(userNickname);

        Boolean result= userService.checkDuplicateUserNickName(userNickname);
        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok().body(result);
        return responseEntity;
    }

//아이디 중복체크
    @GetMapping("/check/loginId/{loginId}")
    public ResponseEntity<Boolean> checkDuplicateLoginId(@PathVariable("loginId") String loginId){
        System.out.println(loginId);

       Boolean result=userService.checkDuplicateLoginId((loginId));
       ResponseEntity<Boolean> responseEntity=ResponseEntity.ok().body(result);
       return responseEntity;
    }

//이메일 중복체크
    @GetMapping("/check/email/{email}")
    public ResponseEntity<Boolean> checkDuplicateEmail(@PathVariable("email") String email){
        System.out.println(email);

        Boolean result=userService.checkDuplicateEmail((email));
        ResponseEntity<Boolean> responseEntity=ResponseEntity.ok().body(result);
        return responseEntity;
    }

//회원가입
    @PostMapping
    public ResponseEntity<Boolean> createUser(@RequestBody UserDTO.UserRequestDTO userDTO) {
        System.out.println("객체확인"+userDTO);

        boolean result=userService.creatUser(userDTO);

        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok()
                .body(result);
        return  responseEntity;


    }

//로그인
    @PostMapping("/login")

    public ResponseEntity<LoginResponseDTO> logIn(@RequestBody UserDTO.UserRequestDTO userRequestDTO) {
        System.out.println("객체확인" + userRequestDTO);

      LoginResponseDTO result= userService.login(userRequestDTO);
      return ResponseEntity.ok()
              .body(result);


    }
//회원정보수정
    @PatchMapping

    public ResponseEntity<UpdateResponseDTO> updateUser(@RequestBody UserDTO.UserRequestDTO userDTO) {

        System.out.println(userDTO);

        UpdateResponseDTO result=userService.updateUser(userDTO);
        return ResponseEntity.ok()
                .body(result);

    }



    @GetMapping("/info/{userId}")
    public ResponseEntity<UserDTO.UserResponseDTO> getUserInfo(@PathVariable("userId") Integer userId) {
        UserDTO.UserResponseDTO result = userService.getUserInfo(userId);

        return new ResponseEntity<UserDTO.UserResponseDTO>(result,HttpStatus.OK);
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<UserDTO.UserResponseDTO> getUserProfile(@PathVariable("userId") Integer userId) {
        UserDTO.UserResponseDTO userResponseDTO = userService.getUserInfo(userId);

        if (userResponseDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(userResponseDTO);
    }

//비밀번호재설정 회원확인
    @PostMapping("/checkUserInfo")
    public ResponseEntity<Boolean> getPassword(@RequestBody UserDTO.UserRequestDTO userDTO) {

        System.out.println(userDTO);
        Boolean result=userService.checkUser(userDTO);
        System.out.println(result);
        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok()
                .body(result);
        return  responseEntity;


    }
//인증코드 확인
    @PostMapping("/checkUserCode")
    public ResponseEntity<Boolean> checkUserCode(@RequestBody UserDTO.UserRequestDTO userDTO) {

        System.out.println(userDTO);
        Boolean result=userService.checkUserCode(userDTO);
        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok()
                .body(result);
        return  responseEntity;

    }

//비밀번호재설정

    @PatchMapping("/updatePassword")
    public ResponseEntity<UpdateResponseDTO > updatePassword(@RequestBody UserDTO.UserRequestDTO userDTO) {
        System.out.println(userDTO);


        UpdateResponseDTO result=userService.updatePassword(userDTO);
        return ResponseEntity.ok()
                .body(result);


    }

}
