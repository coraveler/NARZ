package com.kdt_final.back.chat.domain;

import lombok.Data;

@Data
public class ChatResponseDTO {
    private String channelId;
    private String senderId;
    private String messageId;
    private String sortId;
    private Integer userId;
    private String profileImage;
}
