package com.kdt_final.back.notification.service;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.kdt_final.back.notification.dao.NotificationMapper;
import com.kdt_final.back.notification.domain.NotificationMsgRequestDTO;
import com.kdt_final.back.notification.domain.NotificationMsgResponseDTO;
import com.kdt_final.back.notification.domain.NotificationResponseDTO;

@Service
public class NotificationService {

    @Autowired
    private NotificationMapper notificationMapper;

    public SseEmitter getScheduleList(String userId){

        SseEmitter emitter = new SseEmitter();
        List<NotificationResponseDTO> list = notificationMapper.getScheduleList(userId);
        
        new Thread(() -> {
            try {
                emitter.send(list);
                emitter.complete();
            } catch (IOException e) {
                emitter.completeWithError(e);
            }
        }).start();

        return emitter;
    }

    // 알림 메시지 저장
    public NotificationMsgRequestDTO saveMsg(NotificationMsgRequestDTO params){
        notificationMapper.saveMsg(params);
        return params;
    }

    // 알림 메시지 가져오기
    public List<NotificationMsgResponseDTO> getMsg(String userId){
        return notificationMapper.getMsg(userId);
    }

    // 해당 알림 메시지 삭제하기
    public void deleteMsg(int msgId){
        notificationMapper.deleteMsg(msgId);
    }
}
