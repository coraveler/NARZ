package com.kdt_final.back.mapimg.service;

import java.io.File;
import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MapService {

    public String uploadFile(int id_no, String local, MultipartFile file) {
        String uploadDir = "/Users/kang-geonhan/Documents/kdt-workspace/final-pjt/backend/back/src/main/resources/static/images/map/"+id_no+"/";
        String filePath = uploadDir + local +".png"; 

        File userDir = new File(uploadDir);
        if (!userDir.exists()) {
            userDir.mkdirs();
        }


        File existingFile = new File(filePath);
        if (existingFile.exists()) {
            // 기존 파일 삭제
            if (existingFile.delete()) {
                System.out.println("Deleted existing file: " + filePath);
            } else {
                System.out.println("Failed to delete existing file: " + filePath);
            }
        }

        try {
            File dest = new File(filePath);
            file.transferTo(dest);
            return "File uploaded successfully to: " + filePath;
        } catch (Exception e) {
            e.printStackTrace();
            return "File upload failed";
        }
    }

    public List<String> loadFiles(int id_no) {
        // 예: 사용자 ID에 해당하는 이미지 파일 경로 리스트를 반환
        List<String> imagePaths = new ArrayList<>();
        String userDirectory = "/Users/kang-geonhan/Documents/kdt-workspace/final-pjt/backend/back/src/main/resources/static/images/map/" + id_no + "/";
        
        File userDir = new File(userDirectory);
        if (userDir.exists() && userDir.isDirectory()) {
            File[] files = userDir.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                        imagePaths.add(file.getAbsolutePath());
                    }
                }
            }
        }
        return imagePaths;
    }
    
}
