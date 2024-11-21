package com.kdt_final.back.user.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class AttendancePointResponseDTO {
    private String lastActiveDate;
    private LocalDate attendancePointDate;
}
