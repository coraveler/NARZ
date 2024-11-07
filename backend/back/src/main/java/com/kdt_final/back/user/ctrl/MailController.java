package com.kdt_final.back.user.ctrl;

import com.kdt_final.back.user.dto.MailDTO;
import com.kdt_final.back.user.service.MailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @ResponseBody
    @PostMapping("/emailCheck") //
    public String emailCheck(@RequestBody MailDTO mailDTO) throws MessagingException, UnsupportedEncodingException {
        String authCode = mailService.sendSimpleMessage(mailDTO.getEmail());
        return authCode; // Response body에 값을 반환
    }
}

