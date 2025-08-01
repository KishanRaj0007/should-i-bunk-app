import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CustomThemeProvider, ThemeContext } from './context/ThemeContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LandingPage from './pages/LandingPage'; // <-- NEW
import { createTheme } from '@mui/material/styles';

// --- NEW: A component to protect routes ---
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('jwt_token');
    return token ? children : <Navigate to="/login" />;
};

const AppWithTheme = () => {
    const { mode } = React.useContext(ThemeContext);
    const theme = React.useMemo(() => createTheme({ palette: { mode } }), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                {/* --- Routes are updated --- */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </ThemeProvider>
    );
};

function App() {
    return (
        <CustomThemeProvider>
            <Router>
                <AppWithTheme />
            </Router>
        </CustomThemeProvider>
    );
}

export default App;