package com.kdt_final.back.mapshare.ctrl;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.mapshare.domain.MapLikeRequestDTO;
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
    

    @GetMapping("/uploads/images/mapshare/{imgPath:.+}")
    @ResponseBody
    public ResponseEntity<Resource> loadImage(@PathVariable("imgPath") String imgPath) {
        // 상대 경로를 사용하여 파일 경로 설정
        String filePath = System.getProperty("user.dir")+"/uploads/images/mapshare/"+imgPath;
        File file = new File(filePath);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG) // 또는 적절한 MIME 타입
                .body(resource);
    }
    

    // 지도 공유 좋아요 추가
    @PostMapping("/maplike")
    public ResponseEntity<Void> addMapLike(@RequestParam("userId") int userId,
                                            @RequestParam("mapId") int mapId) {
        MapLikeRequestDTO obj = new MapLikeRequestDTO();
        obj.setUserId(userId);
        obj.setMapId(mapId);
        
        mapShareService.addMapLike(obj);
        
        return new ResponseEntity<>(HttpStatus.OK);
    }
    

    @GetMapping("/maplike")
    public ResponseEntity<Boolean> checkMapLike(@RequestParam("userId") int userId,
                                                @RequestParam("mapId") int mapId) {
        MapLikeRequestDTO obj = new MapLikeRequestDTO();
        obj.setUserId(userId);
        obj.setMapId(mapId);
        boolean result = mapShareService.checkMapLike(obj);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/maplike")
    public ResponseEntity<Void> deleteMapLike(@RequestParam("userId") int userId,
                                                @RequestParam("mapId") int mapId) {
        MapLikeRequestDTO obj = new MapLikeRequestDTO();
        obj.setUserId(userId);
        obj.setMapId(mapId);
        mapShareService.deleteMapLike(obj);
    
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/mapliketotal")
    public ResponseEntity<Integer> fetchMapLikeTotal(@RequestParam("mapId") int mapId) {
        Integer result = mapShareService.fetchMapLikeTotal(mapId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/mapshareself")
    public ResponseEntity<List<MapShareResponseDTO>> fetchSelfMapList(@RequestParam("userId") int userId) {
        List<MapShareResponseDTO> list = mapShareService.fetchSelfMapList(userId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    
    
}
