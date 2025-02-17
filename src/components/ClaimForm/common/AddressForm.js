import React from 'react';
import { Grid, MenuItem } from '@mui/material';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import countries from './countries';

const AddressForm = ({ prefix }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Field
          component={TextField}
          name={`${prefix}Name`}
          label="Full Name"
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field
          component={TextField}
          name={`${prefix}Phone`}
          label="Phone Number"
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12}>
        <Field
          component={TextField}
          name={`${prefix}Email`}
          label="Email Address"
          fullWidth
          required
          type="email"
        />
      </Grid>

      <Grid item xs={12}>
        <Field
          component={TextField}
          name={`${prefix}Address`}
          label="Address"
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field
          component={TextField}
          name={`${prefix}City`}
          label="City"
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field
          component={TextField}
          name={`${prefix}State`}
          label="State/Province"
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field
          component={TextField}
          name={`${prefix}Zip`}
          label="ZIP / Postal Code"
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field
          component={TextField}
          name={`${prefix}Country`}
          label="Country"
          select
          fullWidth
          required
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              {country.name}
            </MenuItem>
          ))}
        </Field>
      </Grid>
    </Grid>
  );
};

export default AddressForm; 