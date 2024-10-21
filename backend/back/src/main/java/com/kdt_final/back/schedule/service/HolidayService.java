package com.kdt_final.back.schedule.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdt_final.back.schedule.dao.HolidayMapper;
import com.kdt_final.back.schedule.domain.CreateHolidayDTO;
import com.kdt_final.back.schedule.domain.HolidayResponseDTO;

@Service
public class HolidayService {

    @Autowired
    HolidayMapper holidayMapper;

    // 공휴일 저장
    public String saveHoliday(String data){

        // JSON 파싱을 위해 ObjectMapper 객체 생성
        // ObjectMapper 객체는 보통 JSON데이터 -> Java객체로 변환, Java객체를 JSON형식으로 직렬화할 때 사용
        ObjectMapper objectMapper = new ObjectMapper();
        List<CreateHolidayDTO> list = null;

        try{
            // JSON 문자열을 JsonNode 트리 구조로 변환
            JsonNode root = objectMapper.readTree(data);

            // 내가 원하는 경로의 노드를 찾기
            JsonNode itemNode = root.path("response").path("body").path("items").path("item");
            // itemNode가 배열인지 확인
            if(itemNode.isArray()){
                // JSON 형태의 배열을 HolidayResponseDTO 형태의 배열로 변환 후 리스트로 변환
                list = Arrays.stream(objectMapper.treeToValue(itemNode, CreateHolidayDTO[].class)).toList();
                holidayMapper.saveHoliday(list);
                return "공휴일 데이터가 정상적으로 저장되었습니다.";
            } else {
                System.out.println("parsing error !");;
                return "파싱 에러: 올바른 데이터가 아닙니다, 공휴일 정보에 대한 배열을 확인해 주세요";
            }

        }catch(Exception e){
            e.printStackTrace();
            return "공휴일 데이터 저장 중 오류가 발생했습니다.";
        }
        
    } // saveHoliday end

    public int deleteAllHoliday(){
        return holidayMapper.deleteAllHoliday();
    }

    public List<HolidayResponseDTO> getHoliday(){
        return holidayMapper.getHoliday();
    }

}
