package com.shouldibunk.backend.service;

import com.shouldibunk.backend.domain.AttendanceRecord;
import com.shouldibunk.backend.domain.AttendanceStatus;
import com.shouldibunk.backend.domain.Course;
import com.shouldibunk.backend.domain.User;
import com.shouldibunk.backend.dto.AttendanceRecordRequestDto;
import com.shouldibunk.backend.repository.AttendanceRecordRepository;
import com.shouldibunk.backend.repository.CourseRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final CourseRepository courseRepository;
    private final AttendanceRecordRepository attendanceRecordRepository;

    @Transactional
    public Course recordAttendance(AttendanceRecordRequestDto requestDto) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Course course = courseRepository.findById(requestDto.courseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        if (!course.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission for this course.");
        }

        // Simple "create-only" logic as you requested
        AttendanceRecord newRecord = AttendanceRecord.builder()
                .course(course)
                .date(LocalDate.now())
                .status(requestDto.status())
                .build();
        attendanceRecordRepository.save(newRecord);

        // Update counters based on the new record
        if (requestDto.status() == AttendanceStatus.ATTENDED) {
            course.setClassesAttended(course.getClassesAttended() + 1);
            course.setTotalClassesHeld(course.getTotalClassesHeld() + 1);
        } else if (requestDto.status() == AttendanceStatus.MISSED) {
            course.setTotalClassesHeld(course.getTotalClassesHeld() + 1);
        } else if (requestDto.status() == AttendanceStatus.CANCELLED) {
            course.setClassesCancelled(course.getClassesCancelled() + 1);
        }

        return courseRepository.save(course);
    }
}