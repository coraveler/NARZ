package com.kdt_final.back.comment.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.comment.domain.CommentRequestDTO;
import com.kdt_final.back.comment.domain.CommentResponseDTO;

@Mapper
public interface CommentMapper {
    
    public void saveComment(CommentRequestDTO params);

    public List<CommentResponseDTO> getComments(Integer postId); 
}
