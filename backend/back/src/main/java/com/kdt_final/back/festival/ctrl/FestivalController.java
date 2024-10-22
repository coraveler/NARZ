package com.kdt_final.back.festival.ctrl;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kdt_final.back.festival.domain.FestivalResponseDTO;
import com.kdt_final.back.festival.service.FestivalService;



@RestController
@RequestMapping("/api")
@EnableScheduling
public class FestivalController {
    
    @Autowired
    FestivalService festivalService;

    @Value("${festival.callBackUrl}")
    private String callBackUrl;

    @Value("${festival.serviceKey}")
    private String serviceKey;
    

    // 페스티벌 일정 db 저장
    @Scheduled(cron="0 20 10 22 * ?")
    public void saveFestival() {
        
        // 페스티벌 기존 데이터 삭제
        int numOfFestival = festivalService.deleteAllFestival();
        System.out.println("축제 일정 갱신을 위해 " + numOfFestival + "개의 페스티벌 일정을 삭제했습니다.");

        String requestURL = callBackUrl +
                "?ServiceKey=" + serviceKey +
                "&numOfRows=2000" + 
                "&type=JSON";

            try{
                // 요청 URL 생성
                URL url = new URL(requestURL);
                // 특정 URL 에 대한 HTTP 연결 생성
                HttpURLConnection conn = (HttpURLConnection)url.openConnection(); 
                // 서버로부터 응답 코드
                int code = conn.getResponseCode();

                // 서버로부터 응답이 정상일 경우 진행
                if(code == 200){
                    
                    // 입력 스트림을 통해 서버 응답 내용을 읽음
                    InputStream stream = conn.getInputStream();
                    // 바이트 배열을 읽고 문자열로 변환
                    String result = new String(stream.readAllBytes(), StandardCharsets.UTF_8);

                    String resultMsg = festivalService.saveFestival(result);
                    System.out.println(resultMsg);
                }
            } catch (Exception e){
                // 예외가 발생한 경우 스택 트레이스를 출력하여 오류 내용을 확인
                e.printStackTrace();
            }
    }

    @GetMapping("/festival")
    public ResponseEntity<List<FestivalResponseDTO>> getFestival() {
        List<FestivalResponseDTO> list = null;
        list = festivalService.getFestival();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    
}