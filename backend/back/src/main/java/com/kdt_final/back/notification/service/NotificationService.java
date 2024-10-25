package com.kdt_final.back.notification.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kdt_final.back.notification.dao.NotificationMapper;
import com.kdt_final.back.notification.domain.NotificationResponseDTO;

@Service
public class NotificationService {
    @Autowired
    private NotificationMapper notificationMapper;

    public List<NotificationResponseDTO> getScheduleList(String userId){
        return notificationMapper.getScheduleList(userId);
    }
}
