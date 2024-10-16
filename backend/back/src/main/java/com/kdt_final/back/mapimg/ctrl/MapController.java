package com.kdt_final.back.mapimg.ctrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.mapimg.service.MapService;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private MapService MapService;

    @PostMapping("/upload")
    public ResponseEntity<String> upload( @RequestParam("id") String id,
                                        @RequestParam("local") String local,
                                        @RequestParam("file") MultipartFile file) {

        System.out.println(id);
        System.out.println(file);
        System.out.println(local);

        String result = MapService.uploadFile(id, local, file);
        return ResponseEntity.ok(result);
    }

}
