package com.kdt_final.back.user.ctrl;

import com.kdt_final.back.user.dto.LoginResponseDTO;
import com.kdt_final.back.user.dto.UserDTO;
import com.kdt_final.back.user.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
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




    @GetMapping("/check/userNickname/{userNickname}")
    public ResponseEntity <Boolean> checkDuplicateUserNickName(@PathVariable String userNickname) {
        System.out.println(userNickname);

        Boolean result= userService.checkDuplicateUserNickName(userNickname);
        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok().body(result);
        return responseEntity;
    }


    @GetMapping("/check/loginId/{loginId}")
    public ResponseEntity<Boolean> checkDuplicateLoginId(@PathVariable String loginId){
        System.out.println(loginId);

       Boolean result=userService.checkDuplicateLoginId((loginId));
       ResponseEntity<Boolean> responseEntity=ResponseEntity.ok().body(result);
       return responseEntity;
    }


    @PostMapping
    public ResponseEntity<Boolean> createUser(@RequestBody UserDTO.UserRequestDTO userDTO) {
        System.out.println("객체확인"+userDTO);

        userService.creatUser(userDTO);

        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok()
                .body(true);
        return  responseEntity;


    }

    @PostMapping("/login")

    public ResponseEntity<LoginResponseDTO> logIn(@RequestBody UserDTO.UserRequestDTO userRequestDTO) {
        System.out.println("객체확인" + userRequestDTO);

      LoginResponseDTO result= userService.login(userRequestDTO);
      return ResponseEntity.ok()
              .body(result);


    }


}
