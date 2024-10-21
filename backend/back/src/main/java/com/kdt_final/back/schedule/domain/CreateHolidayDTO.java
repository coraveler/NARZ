package com.kdt_final.back.schedule.domain;

import lombok.Data;

@Data
public class CreateHolidayDTO {
    String dateKind;
    String dateName;
    String isHoliday;
    int locdate;
    int seq;
}
