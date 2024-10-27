package com.kdt_final.back.user.ctrl;

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

    @GetMapping("/{id}")
    public void findUserById(@PathVariable String id){

    }

    @PostMapping
    public ResponseEntity<Boolean> createUser(@RequestBody UserDTO.UserRequestDTO userDTO) {

        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok()
                .body(true);
        return  responseEntity;
    }

    @PatchMapping
    public void updateUser(){

    }

}
