package com.kdt_final.back.mapimg.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
// import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MapService {
    private final ResourceLoader resourceLoader;

    public MapService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }
    
    public String uploadFile(int id_no, String local, MultipartFile file) {
        // classpath 내의 업로드할 경로 설정
        String uploadDir = "classpath:static/images/map/" + id_no + "/";
        String filePath = uploadDir + local + ".png";

        // Resource 객체를 사용하여 경로 가져오기
        Resource resource = resourceLoader.getResource(uploadDir);
        File userDir;

        try {
            userDir = resource.getFile();
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to get the directory: " + e.getMessage();
        }

        // 디렉토리 생성
        if (!userDir.exists()) {
            userDir.mkdirs();
        }

        // 기존 파일 삭제
        File existingFile = new File(userDir, local + ".png");
        if (existingFile.exists()) {
            if (existingFile.delete()) {
                System.out.println("Deleted existing file: " + existingFile.getPath());
            } else {
                System.out.println("Failed to delete existing file: " + existingFile.getPath());
            }
        }

        // 파일 업로드
        try {
            File dest = new File(userDir, local + ".png");
            file.transferTo(dest);
            return "File uploaded successfully to: " + dest.getPath();
        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed: " + e.getMessage();
        }
    }
   
    
     public List<String> loadFiles(int id_no) {
        
        List<String> imageUrls = new ArrayList<>();
        Resource resource = resourceLoader.getResource("classpath:static/images/map/" + id_no + "/");

        try {
            // Path 객체를 이용하여 파일 목록을 가져옴
            Path userDir = Paths.get(resource.getFile().getAbsolutePath());

            if (Files.exists(userDir) && Files.isDirectory(userDir)) {
                Files.list(userDir).forEach(filePath -> {
                    if (Files.isRegularFile(filePath)) {
                        // 파일의 이름을 가져와서 URL 형식으로 변환
                        String fileName = filePath.getFileName().toString();
                        String imageUrl = "http://localhost:7777/map/img/" + id_no + "/" + fileName; // URL 생성
                        imageUrls.add(imageUrl); // URL을 리스트에 추가
                    }
                });
            }
        } catch (IOException e) {
            e.printStackTrace(); // 에러 로그 출력
        }

        return imageUrls;
    }


    
}
