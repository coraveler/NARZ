package com.kdt_final.back.user.service;

import com.kdt_final.back.shop.dao.CouponMapper;
import com.kdt_final.back.shop.domain.CouponRequest;
import com.kdt_final.back.user.dao.email.MemoryEmailRepository;
import com.kdt_final.back.user.dao.user.UserRepository;
import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.UserDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "yunsemi563@gmail.com";
    private final UserRepository userRepository;
    private final MemoryEmailRepository emailRepository;
    private final CouponMapper couponMapper;

    // 랜덤으로 숫자 생성
    public String createNumber() {
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for (int i = 0; i < 8; i++) { // 인증 코드 8자리
            int index = random.nextInt(3); // 0~2까지 랜덤, 랜덤값으로 switch문 실행

            switch (index) {
                case 0 -> key.append((char) (random.nextInt(26) + 97)); // 소문자
                case 1 -> key.append((char) (random.nextInt(26) + 65)); // 대문자
                case 2 -> key.append(random.nextInt(10)); // 숫자
            }
        }
        return key.toString();
    }

    public MimeMessage createMail(String mail, String number) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.setFrom(senderEmail);
        message.setRecipients(MimeMessage.RecipientType.TO, mail);
        message.setSubject("이메일 인증");
        String body = "";
        body += "<h3>요청하신 인증 번호입니다.</h3>";
        body += "<h1>" + number + "</h1>";
        body += "<h3>감사합니다.</h3>";
        message.setText(body, "UTF-8", "html");

        return message;
    }

    // 메일 발송
    public String sendSimpleMessage(String sendEmail) throws MessagingException {
        String number = createNumber(); // 랜덤 인증번호 생성

        MimeMessage message = createMail(sendEmail, number); // 메일 생성
        try {
            javaMailSender.send(message); // 메일 발송
        } catch (MailException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("메일 발송 중 오류가 발생했습니다.");
        }
        updateCode(sendEmail, number);
        return number; // 생성된 인증번호 반환
    }
//발송된 코드 DB에 저장
    private void updateCode(String sendEmail, String number) {
              userRepository.updateCode(sendEmail, number);


    }

    // 메일 발송
    public Boolean sendSignUPMessage(String sendEmail) throws MessagingException {

        if(!userRepository.findAllByUserEmail(sendEmail).isEmpty()){
            return false;
        }
         else {
            String number = createNumber(); // 랜덤 인증번호 생성
            saveCode(sendEmail, number);
            MimeMessage message = createMail(sendEmail, number); // 메일 생성
            try {
                javaMailSender.send(message); // 메일 발송
            } catch (MailException e) {
                e.printStackTrace();
                throw new IllegalArgumentException("메일 발송 중 오류가 발생했습니다.");
            }

            return true;

        }


    }

    public void saveCode(String sendEmail, String number) {

        User user=new User();
        user.setEmail(sendEmail);
        user.setEmailCode(number);
        emailRepository.saveCode(user);

    }

    // 인증 코드 확인
    public Boolean checkEmailCode(UserDTO.UserRequestDTO userDTO) {
        String emailCode = userDTO.getEmailCode(); // 사용자가 입력한 인증 코드
        String email=userDTO.getEmail();
        String storedCode = emailRepository.findCodeByEmail(email); // 저장된 인증 코드 가져오기
        System.out.println(storedCode);

        if( emailCode.equals(storedCode)){
            emailRepository.deleEmailCode(email);
            return true;


        }
        else return false;
    }
    public MimeMessage createCouponMail(String mail, String number) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.setFrom(senderEmail);
        message.setRecipients(MimeMessage.RecipientType.TO, mail);
        message.setSubject("쿠폰 발급");
        String body = "";
        body += "<h3>쿠폰 번호입니다.</h3>";
        body += "<h1>" + number + "</h1>";
        body += "<h3>감사합니다.</h3>";
        message.setText(body, "UTF-8", "html");

        return message;
    }




    //쿠폰 발송
    public Boolean sendCoupon(String sendEmail) throws MessagingException {

        String number = createNumber(); // 랜덤 인증번호 생성

        MimeMessage message = createCouponMail(sendEmail, number); // 메일 생성
        try {
            javaMailSender.send(message); // 메일 발송
        } catch (MailException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("메일 발송 중 오류가 발생했습니다.");
        }
        insertCoupon(number);

        return true;
    }

    //발송된 쿠폰 DB에 저장
    private void insertCoupon(String number) {
        couponMapper.insertCoupon(number);


    }
    }