import React, { useState } from 'react';
import apiClient from '../services/api';

const CourseForm = ({ onCourseCreated }) => {
    const [courseName, setCourseName] = useState('');
    const [attendanceThreshold, setAttendanceThreshold] = useState(75);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!courseName) {
            setError('Course name is required.');
            return;
        }

        try {
            const response = await apiClient.post('/courses', {
                courseName,
                attendanceThreshold,
                // We'll set default values for other fields for now
                semesterEndDate: '2025-12-31',
                weeklySchedule: {}
            });
            // Call the function passed from the parent component
            onCourseCreated(response.data); 
        } catch (err) {
            console.error("Failed to create course", err);
            setError('Failed to create course.');
        }
    };

    return (
        <div style={{ border: '1px solid black', padding: '20px', margin: '20px 0' }}>
            <h3>Add a New Course</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Name: </label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </div>
                <div style={{marginTop: '10px'}}>
                    <label>Attendance Threshold (%): </label>
                    <input
                        type="number"
                        value={attendanceThreshold}
                        onChange={(e) => setAttendanceThreshold(parseFloat(e.target.value))}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{marginTop: '15px'}}>Create Course</button>
            </form>
        </div>
    );
};

export default CourseForm;