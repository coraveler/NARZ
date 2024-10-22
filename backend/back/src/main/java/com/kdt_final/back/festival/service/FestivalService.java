package com.kdt_final.back.festival.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdt_final.back.festival.dao.FestivalMapper;
import com.kdt_final.back.festival.domain.CreateFestivalDTO;
import com.kdt_final.back.festival.domain.FestivalResponseDTO;

@Service
public class FestivalService {
    
    @Autowired
    FestivalMapper festivalMapper;

    public String saveFestival(String data){

        ObjectMapper objectMapper = new ObjectMapper();
        List<CreateFestivalDTO> list = null;

        try{
            // JSON 문자열을 JsonNode 트리 구조로 변환
            JsonNode root = objectMapper.readTree(data);
            // 내가 원하는 경로의 노드를 찾기
            JsonNode itemNode = root.path("response").path("body").path("items");

            // itemNode가 배열인지 확인
            if(itemNode.isArray()){
                // JSON 형태의 배열을 HolidayResponseDTO 형태의 배열로 변환 후 리스트로 변환
                list = Arrays.stream(objectMapper.treeToValue(itemNode, CreateFestivalDTO[].class))
                .filter(festival -> LocalDate.parse(festival.getFstvlEndDate()).isAfter(LocalDate.now()))
                .toList();
                festivalMapper.saveFestival(list);

                return "새로운 축제 일정을 정상적으로 저장하였습니다.";
            } else {
                System.out.println("parsing error !");;
                return "축제 일정을 가져오는데 실패했습니다.";
            }

        }catch(Exception e){
            e.printStackTrace();
            return "축제 일정 저장에 실패했습니다.";
        }
    } // saveFesival() end

    public int deleteAllFestival(){
        return festivalMapper.deleteAllFestival();
    }

    public List<FestivalResponseDTO> getFestival(){
        return festivalMapper.getFestival();
    }
}
