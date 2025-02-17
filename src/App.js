import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ClaimForm from './components/ClaimForm/ClaimForm';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { Box } from '@mui/material';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2eb67d', // Slack-inspired green
      },
      secondary: {
        main: '#ecb22e', // Slack-inspired yellow
      },
      background: {
        default: darkMode ? '#1a1d21' : '#ffffff',
        paper: darkMode ? '#222529' : '#f8f9fa',
      },
    },
    typography: {
      fontFamily: '"Lato", "Helvetica Neue", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: { xs: 2, sm: 3, md: 4 },
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Routes>
              <Route path="/" element={<ClaimForm />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App; 