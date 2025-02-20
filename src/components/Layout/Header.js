import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, setDarkMode }) => {
  // const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      sx={{
        backgroundColor: '#2D2D2D',
        borderBottom: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#FFFFFF',
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 500,
              letterSpacing: 1,
              color: '#FFFFFF',
              display: { xs: 'block', sm: 'block' },
            }}
          >
            Claims Portal
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{ 
            ml: 1,
            color: '#FFFFFF',
          }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 