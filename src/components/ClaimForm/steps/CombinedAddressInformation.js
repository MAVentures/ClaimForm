import React from 'react';
import { Typography, Grid, Divider } from '@mui/material';
import AddressForm from '../common/AddressForm';

const CombinedAddressInformation = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Claimant Information
        </Typography>
        <AddressForm prefix="claimant" />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Shipper Information
        </Typography>
        <AddressForm prefix="shipper" />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Consignee Information
        </Typography>
        <AddressForm prefix="consignee" />
      </Grid>
    </Grid>
  );
};

export default CombinedAddressInformation; 