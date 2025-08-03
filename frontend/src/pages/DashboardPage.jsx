import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import CourseForm from '../components/CourseForm';
import Layout from '../components/Layout';
import { Box, Button, LinearProgress, Typography, Card, CardContent, CardActions, Grid, IconButton, Alert, Grow, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

const getAttendanceColor = (percentage, threshold) => {
    if (percentage < threshold) return 'error';
    if (percentage < threshold + 10) return 'warning';
    return 'success';
};

const getMotivationalQuote = (percentage, threshold) => {
    if (percentage >= threshold + 10) return "You're on fire! Keep it up!";
    if (percentage >= threshold) return "Nice, you're in the safe zone.";
    return "A little effort will get you back on track!";
};

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            const [userResponse, coursesResponse] = await Promise.all([
                apiClient.get('/api/users/me'),
                apiClient.get('/api/courses')
            ]);
            setUser(userResponse.data);
            setCourses(coursesResponse.data);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            setError('Failed to load dashboard data.');
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        navigate('/login');
    };

    const handleCourseCreated = () => {
        setShowForm(false);
        fetchData();
    };

    const handleRecordAttendance = async (courseId, status) => {
        try {
            const response = await apiClient.post('/api/attendance', { courseId, status });
            const updatedCourse = response.data;
            setCourses(currentCourses =>
                currentCourses.map(c => (c.id === updatedCourse.id ? updatedCourse : c))
            );
        } catch (err) {
            setError('Could not update attendance.');
        }
    };
    
    const handleDeleteCourse = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await apiClient.delete(`/api/courses/${courseId}`);
                fetchData();
            } catch (err) {
                setError('Failed to delete course.');
            }
        }
    };

    return (
        <Layout handleLogout={handleLogout}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography variant="h5">Welcome, {user?.name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">{user?.collegeName}</Typography>
                </Box>
                <Button variant="contained" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add New Course'}
                </Button>
            </Box>

            {showForm && <CourseForm onCourseCreated={handleCourseCreated} />}
            {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>My Courses</Typography>
            <Grid container spacing={3}>
                {courses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <Grow in={true}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h6">{course.courseName}</Typography>
                                        <IconButton size="small" onClick={() => handleDeleteCourse(course.id)} title="Delete Course"><DeleteIcon /></IconButton>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress variant="determinate" value={course.currentPercentage} color={getAttendanceColor(course.currentPercentage, course.attendanceThreshold)} />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">{`${Math.round(course.currentPercentage)}%`}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ShieldOutlinedIcon color="success" sx={{ mr: 1 }} />
                                        <Typography variant="body2">Safe Bunks Remaining: <strong>{course.safeBunks}</strong></Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                        If you bunk next class, Attendance: {course.bunkTodayPercentage.toFixed(1)}%
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                        Last Update: {course.lastUpdatedDate ? new Date(course.lastUpdatedDate).toLocaleDateString() : 'Never'}
                                    </Typography>

                                    <Divider sx={{ my: 2 }}/>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                                        <Box>
                                            <Typography variant="h6">{course.classesAttended}</Typography>
                                            <Typography variant="caption">Attended</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" color="warning.main">{course.classesMissed}</Typography>
                                            <Typography variant="caption">Missed</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" color="info.main">{course.classesCancelled}</Typography>
                                            <Typography variant="caption">Cancelled</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant={course.todaysStatus === 'ATTENDED' ? 'contained' : 'outlined'} onClick={() => handleRecordAttendance(course.id, 'ATTENDED')}>Attended</Button>
                                    <Button size="small" color="warning" variant={course.todysStatus === 'MISSED' ? 'contained' : 'outlined'} onClick={() => handleRecordAttendance(course.id, 'MISSED')}>Missed</Button>
                                    <Button size="small" color="info" variant={course.todaysStatus === 'CANCELLED' ? 'contained' : 'outlined'} onClick={() => handleRecordAttendance(course.id, 'CANCELLED')}>Cancelled</Button>
                                </CardActions>
                            </Card>
                        </Grow>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
};

export default DashboardPage;