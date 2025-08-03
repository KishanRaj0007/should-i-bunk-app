package com.shouldibunk.backend.service;

import com.shouldibunk.backend.domain.AttendanceRecord;
import com.shouldibunk.backend.domain.AttendanceStatus;
import com.shouldibunk.backend.domain.Course;
import com.shouldibunk.backend.domain.User;
import com.shouldibunk.backend.dto.CourseRequestDto;
import com.shouldibunk.backend.dto.CourseResponseDto;
import com.shouldibunk.backend.repository.AttendanceRecordRepository;
import com.shouldibunk.backend.repository.CourseRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final AttendanceRecordRepository attendanceRecordRepository;

    @Transactional(readOnly = true)
    public List<CourseResponseDto> getCoursesForCurrentUser() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Course> courses = courseRepository.findAllByUserIdOrderByIdAsc(currentUser.getId());
        return courses.stream()
                .map(this::buildCourseDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CourseResponseDto getCourseDtoById(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + courseId));
        return buildCourseDto(course);
    }

    private CourseResponseDto buildCourseDto(Course course) {
        LocalDate today = LocalDate.now();
        AttendanceStatus todaysStatus = attendanceRecordRepository
                .findTopByCourseIdAndDateOrderByCreatedAtDesc(course.getId(), today)
                .map(AttendanceRecord::getStatus)
                .orElse(null);

        LocalDate lastUpdatedDate = attendanceRecordRepository
                .findTopByCourseIdOrderByDateDesc(course.getId())
                .map(AttendanceRecord::getDate)
                .orElse(null);

        return CourseResponseDto.fromCourse(course, todaysStatus, lastUpdatedDate);
    }

    @Transactional
    public Course createCourse(CourseRequestDto courseRequestDto) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Course newCourse = Course.builder()
                .user(currentUser)
                .courseName(courseRequestDto.courseName())
                .attendanceThreshold(courseRequestDto.attendanceThreshold())
                .semesterEndDate(courseRequestDto.semesterEndDate())
                .weeklySchedule(courseRequestDto.weeklySchedule())
                .build();
        return courseRepository.save(newCourse);
    }
    
    @Transactional
    public Course updateCourse(Long courseId, CourseRequestDto courseDetails) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + courseId));
        if (!course.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to update this course.");
        }
        course.setCourseName(courseDetails.courseName());
        course.setAttendanceThreshold(courseDetails.attendanceThreshold());
        course.setSemesterEndDate(courseDetails.semesterEndDate());
        course.setWeeklySchedule(courseDetails.weeklySchedule());
        return courseRepository.save(course);
    }

    @Transactional
    public void deleteCourse(Long courseId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + courseId));
        if (!course.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to delete this course.");
        }
        courseRepository.delete(course);
    }
}