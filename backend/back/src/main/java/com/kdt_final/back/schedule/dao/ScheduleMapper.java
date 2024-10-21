package com.kdt_final.back.schedule.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.schedule.domain.ScheduleRequestDTO;
import com.kdt_final.back.schedule.domain.ScheduleResponseDTO;

@Mapper
public interface ScheduleMapper {

    public void saveSchedule(ScheduleRequestDTO params);  

    public List<ScheduleResponseDTO> getSchedule(String params);

    public void deleteSchedule(int params);

    public ScheduleResponseDTO getScheduleInfo(int id);

    public void updateSchedule(ScheduleRequestDTO params);
} 
