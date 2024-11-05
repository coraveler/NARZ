package com.kdt_final.back.mapshare.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.mapshare.domain.MapShareResponseDTO;
import com.kdt_final.back.mapshare.service.MapShareService;



@RestController
@RequestMapping("/api")
public class MapShareController {
    
    @Autowired
    private MapShareService mapShareService;

    @PostMapping("/mapshare")
    public ResponseEntity<Void> saveMapShareImg(@RequestParam("mapImgUrl") MultipartFile file,
                                                @RequestParam("userId") int userId) {
        
        boolean result = mapShareService.saveMapShareImg(file,userId);

        if (result) {
            return new ResponseEntity<>(HttpStatus.CREATED); // 성공적으로 저장되면 201 상태 코드 반환
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 실패 시 500 상태 코드 반환
        }
    }


    @GetMapping("/mapshare")
    public ResponseEntity<List<MapShareResponseDTO>> getMapShareImg() {

        List<MapShareResponseDTO> list = mapShareService.getMapShareImg();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @DeleteMapping("/mapshare")
    public ResponseEntity<Void> deleteMapShareImg(@RequestParam("mapId") int mapId,
                                                    @RequestParam("mapImgUrl") String mapImgUrl){

        mapShareService.deleteMapShareImg(mapId, mapImgUrl);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
}
