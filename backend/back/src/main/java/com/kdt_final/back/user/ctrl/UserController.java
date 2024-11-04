package com.kdt_final.back.user.ctrl;

import com.kdt_final.back.user.dto.LoginResponseDTO;
import com.kdt_final.back.user.dto.UpdateResponseDTO;
import com.kdt_final.back.user.dto.UserDTO;
import com.kdt_final.back.user.service.UserService;
import lombok.RequiredArgsConstructor;

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
    public ResponseEntity <Boolean> checkDuplicateUserNickName(@PathVariable String userNickname) {
        System.out.println(userNickname);

        Boolean result= userService.checkDuplicateUserNickName(userNickname);
        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok().body(result);
        return responseEntity;
    }

    //아이디 중복체크
    @GetMapping("/check/loginId/{loginId}")
    public ResponseEntity<Boolean> checkDuplicateLoginId(@PathVariable String loginId){
        System.out.println(loginId);

       Boolean result=userService.checkDuplicateLoginId((loginId));
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

    @PatchMapping

    public ResponseEntity<UpdateResponseDTO> updateUser(@RequestBody UserDTO.UserRequestDTO userDTO) {

        System.out.println(userDTO);

        UpdateResponseDTO result=userService.updateUser(userDTO);
        return ResponseEntity.ok()
                .body(result);

    }


}
