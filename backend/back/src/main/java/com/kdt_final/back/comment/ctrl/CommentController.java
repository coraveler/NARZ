package com.kdt_final.back.comment.ctrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kdt_final.back.comment.domain.CommentRequestDTO;
import com.kdt_final.back.comment.service.CommentService;


@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/save")
    public ResponseEntity<Void> commentSave(@RequestBody CommentRequestDTO params) {
        commentService.commentSave(params);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    

}
