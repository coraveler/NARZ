package com.kdt_final.back.notification.dao;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.notification.domain.NotificationResponseDTO;

@Mapper
public interface NotificationMapper {

    public List<NotificationResponseDTO> getScheduleList(String userId);
}   