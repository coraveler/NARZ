package com.kdt_final.back.chat.domain;

import lombok.Data;

@Data
public class ChatRequestDTO {
    private String channelId;
    private String messageId;
    private String sortId;
    private String senderId;
    private String loginId;
    private Integer totalUnread;
}
