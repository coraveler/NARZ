package com.kdt_final.back.mapimg.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
// import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.mapimg.dao.MapMapper;
import com.kdt_final.back.mapimg.domain.LikeCountRequestDTO;

@Service
public class MapService {

    @Autowired
    MapMapper mapMapper;

    // 파일 업로드 메서드
    public String uploadFile(int userId, String local, MultipartFile file) {
        String uploadDir = getUploadDir(userId);
        File userDir = new File(uploadDir);

        // 디렉토리 생성
        if (!userDir.exists() && !userDir.mkdirs()) {
            return "Failed to create directory: " + userDir.getPath();
        }

        // 기존 파일 삭제
        deleteExistingFile(userDir, local);

        // 파일 업로드
        return saveFile(userDir, local, file);
    }

    // 업로드할 디렉토리 경로 반환
    private String getUploadDir(int userId) {
        // 현재 작업 디렉토리를 기준으로 절대 경로 설정
        String baseDir = System.getProperty("user.dir");
        return baseDir + "/uploads/images/map/" + userId + "/";
    }

    // 기존 파일 삭제
    private void deleteExistingFile(File userDir, String local) {
        File existingFile = new File(userDir, local + ".png");
        if (existingFile.exists() && !existingFile.delete()) {
            System.out.println("Failed to delete existing file: " + existingFile.getPath());
        } else {
            System.out.println("Deleted existing file: " + existingFile.getPath());
        }
    }

    // 파일 저장 메서드
    private String saveFile(File userDir, String local, MultipartFile file) {
        try {
            File dest = new File(userDir, local + ".png");
            file.transferTo(dest);
            return "File uploaded successfully to: " + dest.getPath();
        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed: " + e.getMessage();
        }
    }





 // 파일 로드 메서드
    public List<String> loadFiles(int userId) {
        List<String> imageUrls = new ArrayList<>();
        String uploadDir = getUploadDir(userId); // 업로드 디렉토리 경로 가져오기

        try {
            // Path 객체를 이용하여 파일 목록을 가져옴
            Path userDir = Paths.get(uploadDir);

            if (Files.exists(userDir) && Files.isDirectory(userDir)) {
                // 디렉토리 내의 모든 파일을 순회
                Files.list(userDir).forEach(filePath -> {
                    if (Files.isRegularFile(filePath)) {
                        // 파일의 이름을 가져와서 URL 형식으로 변환
                        String fileName = filePath.getFileName().toString();
                        String imageUrl = "http://localhost:7777/map/img/" + userId + "/" + fileName; // URL 생성
                        imageUrls.add(imageUrl); // URL을 리스트에 추가
                    }
                });
            }
        } catch (IOException e) {
            e.printStackTrace(); // 에러 로그 출력
        }

        return imageUrls;
    }

    public Integer getLikeCount(LikeCountRequestDTO params){
        return mapMapper.getLikeCount(params);
    }
}

