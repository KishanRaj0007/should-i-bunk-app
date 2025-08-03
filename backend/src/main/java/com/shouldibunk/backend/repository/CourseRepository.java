package com.shouldibunk.backend.repository;

import com.shouldibunk.backend.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findAllByUserIdOrderByIdAsc(Long userId);
}