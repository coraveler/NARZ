package com.kdt_final.back.notification.domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class NotificationMsgResponseDTO {
    private Integer msgId;
    private String msgTitle;
    private String msgContent;
    private LocalDateTime sendDate;
    private String userId;
}
