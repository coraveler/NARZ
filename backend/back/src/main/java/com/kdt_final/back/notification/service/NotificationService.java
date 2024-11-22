package com.kdt_final.back.notification.service;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.kdt_final.back.notification.dao.NotificationMapper;
import com.kdt_final.back.notification.domain.AchievementNotificationRequestDTO;
import com.kdt_final.back.notification.domain.HallOfFameNotificationRequestDTO;
import com.kdt_final.back.notification.domain.NotificationMsgRequestDTO;
import com.kdt_final.back.notification.domain.NotificationMsgResponseDTO;
import com.kdt_final.back.notification.domain.NotificationResponseDTO;
import com.kdt_final.back.notification.domain.RankingNotificationRequestDTO;
import com.kdt_final.back.notification.domain.RankingNotificationResponseDTO;
import com.kdt_final.back.notification.domain.mapRegionNotificationRequestDTO;

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

    public boolean getMapRegion(mapRegionNotificationRequestDTO params){
        return notificationMapper.getMapRegion(params);
    }

    public void saveMapRegion(mapRegionNotificationRequestDTO params){
        notificationMapper.saveMapRegion(params);
    }

    public boolean checkAchievementNotification(AchievementNotificationRequestDTO params){
        return notificationMapper.checkAchievementNotification(params);
    }

    public void saveAchievementNotification(AchievementNotificationRequestDTO params){
        notificationMapper.saveAchievementNotification(params);
    }

    public RankingNotificationResponseDTO fetchRankingInfo(RankingNotificationRequestDTO param){
        return notificationMapper.fetchRankingInfo(param);
    }

    public List<RankingNotificationResponseDTO> fetchPostRanking(RankingNotificationRequestDTO param){
        return notificationMapper.fetchPostRanking(param);
    }

    public void updateRankingNotified(String param){
        notificationMapper.updateRankingNotified(param);
    }

    public boolean fetchHallOfFameInfo(HallOfFameNotificationRequestDTO param){
        return notificationMapper.fetchHallOfFameInfo(param);
    }

    public void saveHallOfFameNotification(HallOfFameNotificationRequestDTO param){
        notificationMapper.saveHallOfFameNotification(param);
    }
    
}
