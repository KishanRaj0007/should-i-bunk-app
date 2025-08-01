package com.shouldibunk.backend.dto;

import com.shouldibunk.backend.domain.AttendanceStatus;
import com.shouldibunk.backend.domain.Course;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Map;

public record CourseResponseDto(
        Long id,
        String courseName,
        double attendanceThreshold,
        double currentPercentage,
        double bunkTodayPercentage,
        int safeBunks,
        LocalDate semesterEndDate,
        Map<DayOfWeek, Integer> weeklySchedule,
        AttendanceStatus todaysStatus,
        int classesAttended,
        int classesMissed,
        int classesCancelled,
        LocalDate lastUpdatedDate
) {
    public static CourseResponseDto fromCourse(Course course, AttendanceStatus todaysStatus, LocalDate lastUpdatedDate) {
        double currentPercentage = 0;
        if (course.getTotalClassesHeld() > 0) {
            currentPercentage = ((double) course.getClassesAttended() / course.getTotalClassesHeld()) * 100;
        }
        double bunkTodayPercentage = ((double) course.getClassesAttended() / (course.getTotalClassesHeld() + 1)) * 100;
        int safeBunks = 0;
        if (course.getAttendanceThreshold() > 0) {
            double requiredBunksValue = (100.0 * course.getClassesAttended() / course.getAttendanceThreshold()) - course.getTotalClassesHeld();
            safeBunks = Math.max(0, (int) Math.floor(requiredBunksValue));
        }
        int classesMissed = course.getTotalClassesHeld() - course.getClassesAttended();

        return new CourseResponseDto(
                course.getId(), course.getCourseName(), course.getAttendanceThreshold(),
                currentPercentage, bunkTodayPercentage, safeBunks,
                course.getSemesterEndDate(), course.getWeeklySchedule(), todaysStatus,
                course.getClassesAttended(), classesMissed, course.getClassesCancelled(),
                lastUpdatedDate
        );
    }
}