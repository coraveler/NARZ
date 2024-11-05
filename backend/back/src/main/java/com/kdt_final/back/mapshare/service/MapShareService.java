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

        MapShareRequestDTO obj = new MapShareRequestDTO();
        String path = "/Users/kang-geonhan/Documents/final-pjt/uploads/images/mapshare";
        
        UUID uuid = UUID.randomUUID();
        String fileName = file.getOriginalFilename()+"_"+uuid+".png";

        File saveFile = new File(path, fileName);

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

    public List<MapShareResponseDTO> getMapShareImg(){
        System.out.println("ASDASDASDASDASD");
        return mapShareMapper.getMapShareImg();
    }

    public void deleteMapShareImg(int mapId, String mapImgUrl){
        mapShareMapper.deleteMapShareImg(mapId);
        String path = "/Users/ksiu/final-pjt/uploads/images/mapshare";
        File file = new File(path, mapImgUrl);
        // 파일 존재 여부 확인 후 삭제
        if (file.exists() && file.delete()) {
            System.out.println("이미지 파일 삭제 완료");
        } else {
            System.out.println("이미지 파일 삭제 실패 또는 파일이 존재하지 않음");
        }
    }
}
