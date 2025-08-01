import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Switch, Button, Container, Link } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import apiClient from '../services/api';

const Layout = ({ children, handleLogout }) => {
    const { mode, toggleTheme } = useContext(ThemeContext);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        apiClient.get('/users/count').then(response => {
            setUserCount(response.data);
        });
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static" sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Should I Bunk?
                    </Typography>
                    <Typography>{mode === 'light' ? 'Light' : 'Dark'}</Typography>
                    <Switch checked={mode === 'dark'} onChange={toggleTheme} color="default" />
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
                {children}
            </Container>

            <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 'auto' }}>
                <Container maxWidth="lg">
                    <Typography variant="body1" align="center">
                        Contact: <Link href="mailto:contact.kishanraj@gmail.com">contact.kishanraj@gmail.com</Link> | <Link href="https://www.linkedin.com/in/kishan0007" target="_blank">LinkedIn</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                        {`Serving ${userCount} students and counting!`}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;