import React from 'react';
import {
  Typography,
  Grid,
  Button,
  IconButton,
  Paper,
  MenuItem,
} from '@mui/material';
import { Field, FieldArray } from 'formik';
import { TextField } from '@formik/mui';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const costTypes = [
  { value: 'shipping', label: 'Shipping' },
  { value: 'handling', label: 'Handling' },
  { value: 'storage', label: 'Storage' },
  { value: 'repair', label: 'Repair' },
  { value: 'other', label: 'Other' },
];

const AdditionalCosts = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Additional Costs
      </Typography>

      <FieldArray name="additionalCosts">
        {({ push, remove, form }) => (
          <div>
            {form.values.additionalCosts.map((cost, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{ p: 3, mb: 3, position: 'relative' }}
              >
                <IconButton
                  onClick={() => remove(index)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: form.values.additionalCosts.length === 1 ? 'none' : 'flex',
                  }}
                >
                  <DeleteIcon />
                </IconButton>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Field
                      component={TextField}
                      name={`additionalCosts.${index}.type`}
                      label="Cost Type"
                      select
                      fullWidth
                      required
                    >
                      {costTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Field
                      component={TextField}
                      name={`additionalCosts.${index}.description`}
                      label="Description"
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Field
                      component={TextField}
                      name={`additionalCosts.${index}.amount`}
                      label="Amount [USD]"
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() =>
                push({
                  type: '',
                  description: '',
                  amount: '',
                })
              }
            >
              Add Cost
            </Button>
          </div>
        )}
      </FieldArray>
    </>
  );
};

export default AdditionalCosts; 