package com.shouldibunk.backend.repository;

import com.shouldibunk.backend.domain.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {

    Optional<AttendanceRecord> findTopByCourseIdOrderByDateDesc(Long courseId);

    Optional<AttendanceRecord> findTopByCourseIdAndDateOrderByCreatedAtDesc(Long courseId, LocalDate date);
}