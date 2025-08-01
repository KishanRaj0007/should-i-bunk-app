package com.shouldibunk.backend.dto;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Map;

// This will be used to get data from the user when they create or update a course.
public record CourseRequestDto(
        String courseName,
        double attendanceThreshold,
        LocalDate semesterEndDate,
        Map<DayOfWeek, Integer> weeklySchedule){
}

