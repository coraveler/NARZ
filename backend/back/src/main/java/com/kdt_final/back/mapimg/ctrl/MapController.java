package com.kdt_final.back.mapimg.ctrl;

import java.util.List;
import java.io.File;

import org.springframework.core.io.Resource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.mapimg.domain.LikeCountRequestDTO;
import com.kdt_final.back.mapimg.service.MapService;


@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private MapService mapService;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("userId") int userId,
                                        @RequestParam("local") String local,
                                        @RequestParam("file") MultipartFile file) {

        String result = mapService.uploadFile(userId, local, file);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/load/{userId}")
    public ResponseEntity<List<String>> loadFiles(@PathVariable("userId") int userId) {
        List<String> imagePaths = mapService.loadFiles(userId);
        return new ResponseEntity<>(imagePaths, HttpStatus.OK);
    }
    
    @GetMapping("img/{userId}/{fileName:.+}")
    @ResponseBody
    public ResponseEntity<Resource> loadImage(@PathVariable("userId") int userId, @PathVariable("fileName") String fileName) {
        // 상대 경로를 사용하여 파일 경로 설정
        String filePath = System.getProperty("user.dir") + "/uploads/images/map/" + userId + "/" + fileName;
        File file = new File(filePath);

        System.out.println("File path: " + filePath); // 경로 로그 출력

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG) // 또는 적절한 MIME 타입
                .body(resource);
    }

    @GetMapping("/localLikeCount")
    public ResponseEntity<Integer> getLikeCount(@RequestParam("local") String local, @RequestParam("userId") Integer userId) {
        LikeCountRequestDTO params = new LikeCountRequestDTO();
        params.setLocal(local);
        params.setUserId(userId);
        Integer result = mapService.getLikeCount(params);
        return new ResponseEntity<Integer>(result, HttpStatus.OK);
    }
}
