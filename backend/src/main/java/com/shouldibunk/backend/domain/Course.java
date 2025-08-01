package com.shouldibunk.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AttendanceRecord> attendanceRecords = new ArrayList<>();
    
    private String courseName;
    private double attendanceThreshold = 75.0;
    private LocalDate semesterEndDate;
    private int totalClassesHeld = 0;
    private int classesAttended = 0;
    
    // --- ADD THIS ONE LINE ---
    private int classesCancelled = 0;

    @ElementCollection
    @CollectionTable(name = "course_weekly_schedule")
    @MapKeyEnumerated(EnumType.STRING)
    private Map<DayOfWeek, Integer> weeklySchedule;
}