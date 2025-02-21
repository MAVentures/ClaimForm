import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/images/Logo192.PNG`}
            alt="MAV Inc Logo"
            onError={(e) => {
              console.error('Error loading image:', e);
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = '/images/Logo512.png'; // Try fallback image
            }}
            sx={{
              height: 44,
              width: 'auto',
              backgroundColor: theme.palette.background.paper,
              padding: '5px 10px',
              borderRadius: '4px',
            }}
          />
          <Typography variant="body2" color="text.secondary">
            © {currentYear} MAV Inc. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 