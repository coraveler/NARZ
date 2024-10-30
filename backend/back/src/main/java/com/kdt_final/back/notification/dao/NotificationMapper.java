package com.kdt_final.back.notification.dao;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.notification.domain.NotificationMsgRequestDTO;
import com.kdt_final.back.notification.domain.NotificationMsgResponseDTO;
import com.kdt_final.back.notification.domain.NotificationResponseDTO;

@Mapper
public interface NotificationMapper {

    public List<NotificationResponseDTO> getScheduleList(String userId);

    public void saveMsg(NotificationMsgRequestDTO params);

    public List<NotificationMsgResponseDTO> getMsg(String userId);

    public void deleteMsg(int msgId);
}   