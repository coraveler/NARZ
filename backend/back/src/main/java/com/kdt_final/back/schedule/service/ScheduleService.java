package com.kdt_final.back.schedule.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kdt_final.back.schedule.dao.ScheduleMapper;
import com.kdt_final.back.schedule.domain.ScheduleRequestDTO;
import com.kdt_final.back.schedule.domain.ScheduleResponseDTO;

@Service
public class ScheduleService {
    
    @Autowired
    private ScheduleMapper scheduleMapper;

    public void saveSchedule(ScheduleRequestDTO params){
        scheduleMapper.saveSchedule(params);
    }

    public List<ScheduleResponseDTO> getSchedule(String params){
        return scheduleMapper.getSchedule(params);
    }

    public void deleteSchedule(int params){
        scheduleMapper.deleteSchedule(params);
    }

    public ScheduleResponseDTO getScheduleInfo(int params){
        return scheduleMapper.getScheduleInfo(params);
    }

    public void updateSchedule(ScheduleRequestDTO params){
        scheduleMapper.updateSchedule(params);
    }
}
