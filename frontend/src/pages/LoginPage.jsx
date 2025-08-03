import React, { useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import apiClient from '../services/api';
import { Container, Box, Typography, TextField, Button, Link, Alert, Paper } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await apiClient.post('/api/auth/login', { email, password });
            localStorage.setItem('jwt_token', response.data.token);
            sessionStorage.setItem('showWelcome', 'true');
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                <SchoolIcon sx={{ fontSize: 40, mb: 1 }} color="primary" />
                <Typography component="h1" variant="h5">Sign In</Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <Alert severity="error" sx={{ width: '100%', mt: 1 }}>{error}</Alert>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                    
                    {/* --- THIS SECTION IS CORRECTED --- */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', mt: 1 }}>
                        <Link component={RouterLink} to="/signup" variant="body2" sx={{ mb: 1 }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                        <Link component={RouterLink} to="/forgot-password" variant="body2">
                            Forgot password?
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;