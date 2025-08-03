package com.shouldibunk.backend.dto;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Map;

public record CourseRequestDto(
        String courseName,
        double attendanceThreshold,
        LocalDate semesterEndDate,
        Map<DayOfWeek, Integer> weeklySchedule){
}

