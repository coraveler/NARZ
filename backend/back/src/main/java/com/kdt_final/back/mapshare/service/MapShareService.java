package com.kdt_final.back.mapshare.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.mapshare.dao.MapShareMapper;
import com.kdt_final.back.mapshare.domain.MapShareRequestDTO;
import com.kdt_final.back.mapshare.domain.MapShareResponseDTO;

@Service
public class MapShareService {
    
    @Autowired
    private MapShareMapper mapShareMapper;


    public boolean saveMapShareImg(MultipartFile file, int userId){

        // 애플리케이션의 실행 경로를 기준으로 절대경로 만들기
        // System.getProperty("user.dir")은 프로젝트의 루트 경로 (final-pjt)로 설정됨
        String absolutePath = System.getProperty("user.dir") + "/uploads/images/mapshare";

        MapShareRequestDTO obj = new MapShareRequestDTO();
        UUID uuid = UUID.randomUUID();
        String fileName = file.getOriginalFilename()+"_"+uuid+".png";
        File saveFile = new File(absolutePath, fileName);

        try{
            file.transferTo(saveFile);
            obj.setUserId(userId);
            obj.setMapImgUrl(fileName);
            mapShareMapper.saveMapShareImg(obj);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }


    // 공유 이미지 가져오기
    public List<MapShareResponseDTO> getMapShareImg(){
        return mapShareMapper.getMapShareImg();
    }


    // 공유 이미지 삭제
    public void deleteMapShareImg(int mapId, String mapImgUrl){

        String absolutePath = System.getProperty("user.dir") + "/uploads/images/mapshare";
        mapShareMapper.deleteMapShareImg(mapId);
        File file = new File(absolutePath, mapImgUrl);
        // 파일 존재 여부 확인 후 삭제
        if (file.exists() && file.delete()) {
            System.out.println("이미지 파일 삭제 완료");
        } else {
            System.out.println("이미지 파일 삭제 실패 또는 파일이 존재하지 않음");
        }
    }
}
