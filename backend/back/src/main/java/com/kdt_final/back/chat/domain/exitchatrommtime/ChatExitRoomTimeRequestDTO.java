package com.kdt_final.back.chat.domain.exitchatrommtime;

import lombok.Data;

@Data
public class ChatExitRoomTimeRequestDTO {
    private String loginId;
    private String channelId;
    private String createdAt;
}
