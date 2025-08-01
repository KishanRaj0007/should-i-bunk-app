package com.shouldibunk.backend.dto;

import com.shouldibunk.backend.domain.AttendanceStatus;

//  a simple object to carry the data for an attendance record submission
public record AttendanceRecordRequestDto(
        Long courseId,
        AttendanceStatus status // Will be ATTENDED, MISSED, or CANCELLED
) {
}
