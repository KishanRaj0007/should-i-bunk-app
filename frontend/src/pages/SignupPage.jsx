import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import apiClient from '../services/api';
import { Container, Box, Typography, TextField, Button, Link, Alert, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';


const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await apiClient.post('/auth/register', { name, email, password });
            alert('Signup successful! Please log in.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during signup.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                <SchoolIcon sx={{ fontSize: 40, mb: 1 }} color="primary" />
                <Typography component="h1" variant="h5">Sign Up</Typography>
                <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <Alert severity="error" sx={{ width: '100%', mt: 1 }}>{error}</Alert>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                    
                    {/* --- THIS SECTION IS CORRECTED --- */}
                     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                        <Link component={RouterLink} to="/login" variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignupPage;