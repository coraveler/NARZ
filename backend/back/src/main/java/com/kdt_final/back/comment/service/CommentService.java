package com.kdt_final.back.comment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kdt_final.back.comment.dao.CommentMapper;
import com.kdt_final.back.comment.domain.CommentRequestDTO;

@Service
public class CommentService {

    @Autowired
    private CommentMapper commentMapper;

    public void commentSave(CommentRequestDTO params) {

    }
}
