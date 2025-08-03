import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import apiClient from '../services/api';
import { Container, Box, Typography, TextField, Button, Link, Alert, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');
        try {
            await apiClient.post('/api/auth/forgot-password', { email });
            setMessage('If an account with that email exists, a password reset link has been sent.');
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                <SchoolIcon sx={{ fontSize: 40, mb: 1 }} color="primary" />
                <Typography component="h1" variant="h5">Forgot Password</Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Enter your email address and we'll send you a link to reset your password.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {message && <Alert severity="success" sx={{ width: '100%', mt: 1 }}>{message}</Alert>}
                    {error && <Alert severity="error" sx={{ width: '100%', mt: 1 }}>{error}</Alert>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Send Reset Link
                    </Button>
                    <Link component={RouterLink} to="/login" variant="body2">
                        Back to Sign In
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};

export default ForgotPasswordPage;