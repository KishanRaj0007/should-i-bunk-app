import React, { useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import apiClient from '../services/api';
import { Container, Box, Typography, TextField, Button, Link, Alert, Paper } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

const ResetPasswordPage = () => {
    // useParams() reads the URL parameter, in our case the 'token'
    const { token } = useParams();
    const navigate = useNavigate();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await apiClient.post('/api/auth/reset-password', { token, newPassword: password });
            setMessage('Your password has been reset successfully! You can now log in.');
            // Redirect to login after a few seconds
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired token. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                <LockResetIcon sx={{ fontSize: 40, mb: 1 }} color="primary" />
                <Typography component="h1" variant="h5">Reset Your Password</Typography>
                
                {!message ? (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm New Password"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && <Alert severity="error" sx={{ width: '100%', mt: 1 }}>{error}</Alert>}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Reset Password
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ mt: 3 }}>
                        <Alert severity="success">{message}</Alert>
                        <Link component={RouterLink} to="/login" variant="body2" sx={{display: 'block', textAlign: 'center', mt: 2}}>
                            Back to Sign In
                        </Link>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default ResetPasswordPage;