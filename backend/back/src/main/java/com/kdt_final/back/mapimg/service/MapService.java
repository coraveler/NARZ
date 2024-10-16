package com.kdt_final.back.mapimg.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.mapimg.dao.MapMapper;
import com.kdt_final.back.mapimg.domain.MapRequestDTO;

@Service
public class MapService {

    @Autowired
    private MapMapper mapMapper;

    public String uploadFile(String id, String local, MultipartFile file) {
        String uploadDir = "/Users/kang-geonhan/Documents/kdt-workspace/final-pjt/backend/back/src/main/resources/static/images/map/";
        String filePath = uploadDir + id + local +".png";

        File existingFile = new File(filePath);
        if (existingFile.exists()) {
            // 기존 파일 삭제
            if (existingFile.delete()) {
                System.out.println("Deleted existing file: " + filePath);
            } else {
                System.out.println("Failed to delete existing file: " + filePath);
            }
        }
        
        MapRequestDTO params = new MapRequestDTO();
        params.setId(id);
        params.setLocal(local);
        params.setImg_path(filePath);

        mapMapper.upload(params);

        try {
            File dest = new File(filePath);
            file.transferTo(dest);
            return "File uploaded successfully to: " + filePath;
        } catch (Exception e) {
            e.printStackTrace();
            return "File upload failed";
        }
    }
}
