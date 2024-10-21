package com.kdt_final.back.schedule.ctrl;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
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

import com.kdt_final.back.schedule.domain.HolidayResponseDTO;
import com.kdt_final.back.schedule.service.HolidayService;


@RestController
@RequestMapping("/api")
@EnableScheduling
public class HolidayController {

    @Autowired
    HolidayService holidayService;

    // 어플리케이션 프로퍼티스 내에 있는 데이터 가져오기
    @Value("${holiday.callBackUrl}")
    private String callBackUrl;

    @Value("${holiday.serviceKey}")
    private String serviceKey;

    
    // 초,분,시,일,월,요일
    @Scheduled(cron="0 0 0 1 * ?")
    public void saveHoliday() {

        // 기존 일정을 전부 삭제
        int numOfHoliday = holidayService.deleteAllHoliday();
        System.out.println(numOfHoliday + "개의 공휴일 삭제 완료");
        
        // 오늘 날짜 가져오기
        LocalDate today = LocalDate.now();
        // 현재 연도
        int currentYear = today.getYear();

        String resultMsg = null;

        // 현재 연도 기준 -10년 +2년 공휴일 데이터 가져오기
        for(int year=currentYear-10; year<=currentYear+2; year++){

            // 요청 URL
            String requestURL = callBackUrl +
                "?ServiceKey=" + serviceKey +
                "&solYear=" + year + 
                "&numOfRows=30" + 
                "&_type=json";

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

                    resultMsg = holidayService.saveHoliday(result);
                    
                }
            } catch (Exception e){
                // 예외가 발생한 경우 스택 트레이스를 출력하여 오류 내용을 확인
                e.printStackTrace();
            }
        } // 반복문 end

        // 공휴일 저장 결과에 대한 메시지 출력
        System.out.println(resultMsg);
    } // saveHoliday() end

    @GetMapping("/holiday")
    public ResponseEntity<List<HolidayResponseDTO>> getHoliday(){
        List<HolidayResponseDTO> list = holidayService.getHoliday();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    
} // controller end

