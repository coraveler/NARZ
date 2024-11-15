package com.kdt_final.back.chat.dao;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.chat.domain.ChatRequestDTO;
import com.kdt_final.back.chat.domain.ChatResponseDTO;

@Mapper
public interface ChatMapper {

    public void saveLastChat(ChatRequestDTO params);
    
    public ChatResponseDTO getLastChat(ChatRequestDTO params);
    
    public void saveTotalUnread(ChatRequestDTO params);

    public Integer getTotalUnread(String loginId);

    public Integer getUserId(String loginId);
}
