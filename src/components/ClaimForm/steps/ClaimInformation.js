import React from 'react';
import {
  Grid,
  MenuItem,
  Typography,
  TextField as MuiTextField,
} from '@mui/material';
import { Field, useField } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const claimTypes = [
  { value: 'damage', label: 'Damage' },
  { value: 'theft', label: 'Theft' },
  { value: 'accident', label: 'Accident' },
];

const ClaimInformation = () => {
  const [shipmentDateField, shipmentDateMeta, shipmentDateHelpers] = useField('shipmentDate');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Claim Information
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field name="claimType">
          {({ field, meta }) => (
            <MuiTextField
              {...field}
              select
              label="Claim Type"
              fullWidth
              required
              error={meta.touched && !!meta.error}
              helperText={meta.touched && meta.error}
            >
              {claimTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiTextField>
          )}
        </Field>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field name="mavRef">
          {({ field, meta }) => (
            <MuiTextField
              {...field}
              label="MAV Inc REF#"
              fullWidth
              required
              error={meta.touched && !!meta.error}
              helperText={meta.touched && meta.error}
            />
          )}
        </Field>
      </Grid>

      <Grid item xs={12} sm={6}>
        <DatePicker
          label="Shipment Date"
          value={shipmentDateField.value}
          onChange={(value) => {
            shipmentDateHelpers.setValue(value);
          }}
          renderInput={(params) => (
            <MuiTextField
              {...params}
              fullWidth
              required
              error={shipmentDateMeta.touched && !!shipmentDateMeta.error}
              helperText={shipmentDateMeta.touched && shipmentDateMeta.error}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ClaimInformation; 