package com.kdt_final.back.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kdt_final.back.chat.dao.ChatMapper;
import com.kdt_final.back.chat.domain.ChatRequestDTO;
import com.kdt_final.back.chat.domain.ChatResponseDTO;
import com.kdt_final.back.chat.domain.exitchatrommtime.ChatExitRoomTimeRequestDTO;

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
    
    public ChatResponseDTO getUserId(String loginId){
        return chatMapper.getUserId(loginId);
    }
    
    public void saveExitChatRoomTime(ChatExitRoomTimeRequestDTO params){
        chatMapper.saveExitChatRoomTime(params);
    }
    
    public String getExitChatRoomTime(ChatExitRoomTimeRequestDTO params){
        return chatMapper.getExitChatRoomTime(params);
    }

    public void deleteExitChatRoomTime(ChatExitRoomTimeRequestDTO params){
        chatMapper.deleteExitChatRoomTime(params);
    }
}

