package com.kdt_final.back.comment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.kdt_final.back.comment.dao.CommentMapper;
import com.kdt_final.back.comment.domain.CommentRequestDTO;
import com.kdt_final.back.comment.domain.CommentResponseDTO;

@Service
@RequiredArgsConstructor
public class CommentService {

    @Autowired
    private final CommentMapper commentMapper;

    public void saveComment(CommentRequestDTO params) {
        commentMapper.saveComment(params);
    }

    public List<CommentResponseDTO> getComments(Integer postId){
        List<CommentResponseDTO> lst = commentMapper.getComments(postId);
        return lst;
    }

    public void deleteComment(Integer commentId){
        commentMapper.deleteComment(commentId);
    }
 
    public int getUserCommentCount(Integer userId) {
        return commentMapper.countCommentsByUserId(userId);
    }


}