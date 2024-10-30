package com.kdt_final.back.notification.domain;

import lombok.Data;

@Data
public class NotificationMsgRequestDTO {
    private Integer msgId;
    private String msgTitle;
    private String msgContent;
    private String userId;
}
