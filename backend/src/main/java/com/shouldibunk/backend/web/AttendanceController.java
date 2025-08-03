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
        Course updatedCourse = attendanceService.recordAttendance(requestDto);
        
        CourseResponseDto responseDto = courseService.getCourseDtoById(updatedCourse.getId());
        
        return ResponseEntity.ok(responseDto);
    }
}