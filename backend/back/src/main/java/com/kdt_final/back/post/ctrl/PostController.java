package com.kdt_final.back.post.ctrl;

import java.util.List;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.post.domain.PostRequestDTO;
import com.kdt_final.back.post.domain.PostResponseDTO;
import com.kdt_final.back.post.domain.postImage.PostImageResponseDTO;
import com.kdt_final.back.post.service.PostService;



@RestController  
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/save")
    public ResponseEntity<Integer> save(@ModelAttribute PostRequestDTO params,
                                     @RequestParam("images") MultipartFile[] images) {

        System.out.println("debug >>>> bbs controller client path /post/save");
        int postId = postService.save(params, images);
        return new ResponseEntity<Integer>(postId,HttpStatus.OK);
    }
    
    @GetMapping("/get/{local}")
    public ResponseEntity<List<PostResponseDTO>> getAllPost(@PathVariable("local") String local) {
        System.out.println("debug >>>> post controller client path /view");
            List<PostResponseDTO> lst = postService.getAllPost(local);  
        return new ResponseEntity<List<PostResponseDTO>>(lst, HttpStatus.OK);
    }
    
    @GetMapping("/uploads/images/post/{imgPath:.+}")
    @ResponseBody
    public ResponseEntity<Resource> loadImage(@PathVariable("imgPath") String imgPath) {
        // 상대 경로를 사용하여 파일 경로 설정
        String filePath = System.getProperty("user.dir")+"/uploads/images/post/"+imgPath;
        System.out.println("filePath >>>>>> " +filePath);
        File file = new File(filePath);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG) // 또는 적절한 MIME 타입
                .body(resource);
    }

    @GetMapping("/view/{postId}")
    public ResponseEntity<PostResponseDTO> viewPost(@PathVariable("postId") Integer postId) {
        System.out.println("debug >>>> post controller client path /view");
        PostResponseDTO params = postService.viewPost(postId);  
        System.out.println(">>>>>>>>>>>>>>>>>"+params);
        return new ResponseEntity<PostResponseDTO>(params, HttpStatus.OK);
    }

    @GetMapping("/view/images/{postId}")
    public ResponseEntity<List<PostImageResponseDTO>> getPostImages(@PathVariable("postId") Integer postId) {
        System.out.println("debug >>>> post controller client path /view/Images");
        List<PostImageResponseDTO> lst = postService.getPostImages(postId);  
        System.out.println(">>>>>>>>>>>>>>>>>"+lst);
        return new ResponseEntity<List<PostImageResponseDTO>>(lst, HttpStatus.OK);
    }
}
