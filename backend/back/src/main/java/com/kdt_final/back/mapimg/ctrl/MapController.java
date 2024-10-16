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
import org.springframework.web.bind.annotation.CrossOrigin;

import com.kdt_final.back.mapimg.service.MapService;


@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private MapService mapService;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("id_no") int id_no,
                                        @RequestParam("local") String local,
                                        @RequestParam("file") MultipartFile file) {

        String result = mapService.uploadFile(id_no, local, file);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/load/{id_no}")
    public ResponseEntity<List<String>> loadFiles(@PathVariable("id_no") int id_no) {
        List<String> imagePaths = mapService.loadFiles(id_no);
        return new ResponseEntity<>(imagePaths, HttpStatus.OK);
    }
    
    
    @GetMapping("img/{id_no}/{fileName:.+}")
    @ResponseBody
    public ResponseEntity<Resource> loadImage(@PathVariable("id_no") int id_no, @PathVariable("fileName") String fileName) {
        String filePath = "/Users/kang-geonhan/Documents/kdt-workspace/final-pjt/backend/back/src/main/resources/static/images/map/" + id_no + "/" + fileName;
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

}
