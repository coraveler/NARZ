package com.kdt_final.back.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kdt_final.back.chat.dao.ChatMapper;
import com.kdt_final.back.chat.domain.ChatRequestDTO;
import com.kdt_final.back.chat.domain.ChatResponseDTO;

@Service
public class ChatService {
    
    @Autowired
    private ChatMapper chatMapper;

    public void saveLastChat(ChatRequestDTO params){
        chatMapper.saveLastChat(params);
    }
    
    public ChatResponseDTO getLastChat(ChatRequestDTO params){
        return chatMapper.getLastChat(params);
    }

    public void saveTotalUnread(ChatRequestDTO params){
        chatMapper.saveTotalUnread(params);
    }

    public Integer getTotalUnread(String loginId){
        return chatMapper.getTotalUnread(loginId);
    }
}
