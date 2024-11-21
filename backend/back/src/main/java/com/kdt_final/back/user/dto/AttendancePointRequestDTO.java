package com.kdt_final.back.user.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class AttendancePointRequestDTO {
    private int userId;
    private LocalDate attendancePointDate;
}
