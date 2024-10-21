package com.kdt_final.back.post.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.post.domain.PostRequestDTO;
import com.kdt_final.back.post.domain.PostResponseDTO;
import com.kdt_final.back.post.service.PostService;



@RestController  
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/save")
    public ResponseEntity<Void> save(@ModelAttribute PostRequestDTO params,
                                     @RequestParam("images") MultipartFile[] images) {

        System.out.println("debug >>>> bbs controller client path /post/save");
        postService.save(params, images);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("/view")
    public ResponseEntity<List<PostResponseDTO>> getPost() {
        System.out.println("debug >>>> post controller client path /view");
        List<PostResponseDTO> lst = postService.getPost();  
        return new ResponseEntity<List<PostResponseDTO>>(lst, HttpStatus.OK);
    }
    
    
}
