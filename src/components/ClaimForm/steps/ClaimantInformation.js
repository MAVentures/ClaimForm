import React from 'react';
import { Typography } from '@mui/material';
import AddressForm from '../common/AddressForm';

const ClaimantInformation = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Claimant Information
      </Typography>
      <AddressForm prefix="claimant" />
    </>
  );
};

export default ClaimantInformation; 