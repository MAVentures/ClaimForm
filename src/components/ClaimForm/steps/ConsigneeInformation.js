import React from 'react';
import { Typography } from '@mui/material';
import AddressForm from '../common/AddressForm';

const ConsigneeInformation = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Consignee Information
      </Typography>
      <AddressForm prefix="consignee" />
    </>
  );
};

export default ConsigneeInformation; 