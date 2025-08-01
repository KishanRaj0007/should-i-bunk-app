package com.shouldibunk.backend.web;

import com.shouldibunk.backend.dto.CourseRequestDto;
import com.shouldibunk.backend.dto.CourseResponseDto;
import com.shouldibunk.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<Void> createCourse(@RequestBody CourseRequestDto courseRequestDto) {
        courseService.createCourse(courseRequestDto);
        // The frontend will refetch the list to get the new course with all its calculated data.
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CourseResponseDto>> getAllCoursesForUser() {
        // This is now much simpler. It just returns the list the service built.
        return ResponseEntity.ok(courseService.getCoursesForCurrentUser());
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<Void> updateCourse(@PathVariable Long courseId, @RequestBody CourseRequestDto courseRequestDto) {
        courseService.updateCourse(courseId, courseRequestDto);
        // The frontend will refetch the list to see the updated data.
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long courseId) {
        courseService.deleteCourse(courseId);
        return ResponseEntity.noContent().build();
    }
}