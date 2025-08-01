package com.shouldibunk.backend.web;

import com.shouldibunk.backend.domain.Course;
import com.shouldibunk.backend.dto.AttendanceRecordRequestDto;
import com.shouldibunk.backend.dto.CourseResponseDto;
import com.shouldibunk.backend.service.AttendanceService;
import com.shouldibunk.backend.service.CourseService; // Import CourseService
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final CourseService courseService; // Inject CourseService

    @PostMapping
    public ResponseEntity<CourseResponseDto> recordAttendance(@RequestBody AttendanceRecordRequestDto requestDto) {
        // 1. The service updates the attendance and returns the raw Course entity
        Course updatedCourse = attendanceService.recordAttendance(requestDto);
        
        // 2. We use the CourseService to build the full DTO, including the last updated date
        CourseResponseDto responseDto = courseService.getCourseDtoById(updatedCourse.getId());
        
        // 3. Return the complete DTO to the frontend
        return ResponseEntity.ok(responseDto);
    }
}