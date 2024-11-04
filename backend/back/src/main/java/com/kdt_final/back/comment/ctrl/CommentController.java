package com.kdt_final.back.comment.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kdt_final.back.comment.domain.CommentRequestDTO;
import com.kdt_final.back.comment.domain.CommentResponseDTO;
import com.kdt_final.back.comment.service.CommentService;



@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/save")
    public ResponseEntity<Void> saveComment(@RequestBody CommentRequestDTO params) {
        commentService.saveComment(params);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("/get/{postId}")
    public ResponseEntity<List<CommentResponseDTO>> getComments(@PathVariable("postId") Integer postId) {
        List<CommentResponseDTO> lst = commentService.getComments(postId);  
        return new ResponseEntity<List<CommentResponseDTO>>(lst, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{commentId}")
    public void deleteComment(@PathVariable("commentId") Integer commentId){
        commentService.deleteComment(commentId);  
    }
    

}
