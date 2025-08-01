import React from 'react';
import { Button, Typography, Container, Box, Grid, Link, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const LandingPage = () => {
    const features = [
        'Track attendance for all your courses.',
        'Predict your future attendance if you miss a class.',
        'Calculate how many classes you can safely bunk.',
        'User Friendly Interface and Simple to Use.',
        'Forgot password feature with robust and secure authentication.',
        'Don\'t worry! Your data is safe and encrypted.'
    ];

    return (
        <Box sx={{ color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Hero Section */}
            <Container maxWidth="md" sx={{ textAlign: 'center', py: { xs: 8, sm: 12 } }}>
                <SchoolIcon sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                    Should I Bunk?
                </Typography>
                <Typography variant="h5" component="p" color="rgba(255, 255, 255, 0.8)" sx={{ mb: 4 }}>
                    Take control of your college schedule. Maximize your time without risking your grades.
                    <br />
                    <em>Peace to Professors!</em>
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button component={RouterLink} to="/login" variant="contained" size="large">
                        Login
                    </Button>
                    <Button component={RouterLink} to="/signup" variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white' }}>
                        Sign Up
                    </Button>
                </Box>
            </Container>

            {/* Features Section */}
            <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)', py: { xs: 6, sm: 10 } }}>
                <Container maxWidth="md">
                    <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" gutterBottom>
                        Key Features
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <CheckCircleOutlineIcon color="success" />
                                    <Typography variant="body1">{feature}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box component="footer" sx={{ bgcolor: 'rgba(0, 0, 0, 0.4)', py: 3, mt: 'auto' }}>
                <Container maxWidth="lg">
                    <Typography variant="body1" align="center">
                        Contact: <Link href="mailto:contact.kishanraj@gmail.com" color="inherit">contact.kishanraj@gmail.com</Link> | <Link href="https://www.linkedin.com/in/kishan0007" target="_blank" color="inherit">LinkedIn</Link>
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;