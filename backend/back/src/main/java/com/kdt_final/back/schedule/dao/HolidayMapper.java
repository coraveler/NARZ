package com.kdt_final.back.schedule.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.schedule.domain.CreateHolidayDTO;
import com.kdt_final.back.schedule.domain.HolidayResponseDTO;

@Mapper
public interface HolidayMapper {

    public void saveHoliday(List<CreateHolidayDTO> list);

    public int deleteAllHoliday();

    public List<HolidayResponseDTO> getHoliday();
    
}
