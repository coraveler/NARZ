package com.kdt_final.back.user.ctrl;

import com.kdt_final.back.user.dao.user.UserRepository;
import com.kdt_final.back.user.dto.MailDTO;
import com.kdt_final.back.user.dto.UserDTO;
import com.kdt_final.back.user.service.MailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;
    private final UserRepository userRepository;

    @ResponseBody
    @PostMapping("/emailCheck") //
    public String emailCheck(@RequestBody MailDTO mailDTO) throws MessagingException, UnsupportedEncodingException {
        String authCode = mailService.sendSimpleMessage(mailDTO.getEmail());
        return authCode; // Response body에 값을 반환
    }


    @ResponseBody
    @PostMapping("/sendVerificationCode") //
    public Boolean sendSignUPMessage(@RequestBody MailDTO mailDTO) throws MessagingException, UnsupportedEncodingException {

        Boolean authCode = mailService.sendSignUPMessage(mailDTO.getEmail());
        return authCode; // Response body에 값을 반환
    }

    //인증코드 확인
    @PostMapping("/verifyEmailCode")
    public ResponseEntity<Boolean> checkEmailCode(@RequestBody UserDTO.UserRequestDTO userDTO) {

        System.out.println(userDTO);
        Boolean result=mailService.checkEmailCode(userDTO);
        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok()
                .body(result);
        return  responseEntity;

    }

}
