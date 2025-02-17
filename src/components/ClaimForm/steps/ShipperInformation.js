import React from 'react';
import { Typography } from '@mui/material';
import AddressForm from '../common/AddressForm';

const ShipperInformation = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipper Information
      </Typography>
      <AddressForm prefix="shipper" />
    </>
  );
};

export default ShipperInformation; 