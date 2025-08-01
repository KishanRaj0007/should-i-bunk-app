import React, { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            // palette values for light mode
                            background: {
                                default: '#f4f6f8', // A very light grey for the main background
                                paper: '#ffffff', // Pure white for paper/cards
                            },
                        }
                        : {
                            // palette values for dark mode
                            background: {
                                default: '#121212',
                                paper: '#1e1e1e', // A slightly lighter dark for paper/cards
                            },
                        }),
                },
            }),
        [mode],
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};