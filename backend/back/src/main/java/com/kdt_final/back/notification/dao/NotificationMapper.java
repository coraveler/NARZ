package com.kdt_final.back.notification.dao;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.notification.domain.AchievementNotificationRequestDTO;
import com.kdt_final.back.notification.domain.HallOfFameNotificationRequestDTO;
import com.kdt_final.back.notification.domain.NotificationMsgRequestDTO;
import com.kdt_final.back.notification.domain.NotificationMsgResponseDTO;
import com.kdt_final.back.notification.domain.NotificationResponseDTO;
import com.kdt_final.back.notification.domain.RankingNotificationRequestDTO;
import com.kdt_final.back.notification.domain.RankingNotificationResponseDTO;
import com.kdt_final.back.notification.domain.mapRegionNotificationRequestDTO;

@Mapper
public interface NotificationMapper {

    public List<NotificationResponseDTO> getScheduleList(String userId);

    public void saveMsg(NotificationMsgRequestDTO params);

    public List<NotificationMsgResponseDTO> getMsg(String userId);

    public void deleteMsg(int msgId);

    public boolean getMapRegion(mapRegionNotificationRequestDTO params);

    public void saveMapRegion(mapRegionNotificationRequestDTO params);

    public boolean checkAchievementNotification(AchievementNotificationRequestDTO params);

    public void saveAchievementNotification(AchievementNotificationRequestDTO params);

    public RankingNotificationResponseDTO fetchRankingInfo(RankingNotificationRequestDTO param);

    public List<RankingNotificationResponseDTO> fetchPostRanking(RankingNotificationRequestDTO param);

    public void updateRankingNotified(String param);

    public boolean fetchHallOfFameInfo(HallOfFameNotificationRequestDTO param);

    public void saveHallOfFameNotification(HallOfFameNotificationRequestDTO param);
}   