package com.shouldibunk.backend.dto;

import com.shouldibunk.backend.domain.AttendanceStatus;


public record AttendanceRecordRequestDto(
        Long courseId,
        AttendanceStatus status 
) {
}
