import React from 'react';
import {
  Typography,
  Paper,
  Box,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ClaimSubmitted = () => {
  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Box sx={{ mb: 3 }}>
        <CheckCircleOutlineIcon
          sx={{ fontSize: 64, color: 'success.main' }}
        />
      </Box>
      
      <Typography variant="h4" gutterBottom>
        Claim Successfully Submitted
      </Typography>
      
      <Typography variant="body1" paragraph>
        Thank you for submitting your claim. We will review it shortly and get back to you.
      </Typography>
      
      <Typography variant="body1" paragraph>
        If you have any questions, please contact us at:
      </Typography>
      
      <Typography
        variant="h6"
        component="a"
        href="mailto:claims@mavinc.com"
        sx={{
          color: 'primary.main',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        claims@mavinc.com
      </Typography>
      
      <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
        Please keep a record of any correspondence for your reference.
      </Typography>
    </Paper>
  );
};

export default ClaimSubmitted; 