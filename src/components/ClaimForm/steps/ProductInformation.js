import React from 'react';
import {
  Typography,
  Grid,
  Button,
  IconButton,
  Box,
  Paper,
} from '@mui/material';
import { Field, FieldArray } from 'formik';
import { TextField } from 'formik-mui';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ProductInformation = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Product Information
      </Typography>
      
      <FieldArray name="products">
        {({ push, remove, form }) => (
          <div>
            {form.values.products.map((product, index) => (
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
                    display: form.values.products.length === 1 ? 'none' : 'flex',
                  }}
                >
                  <DeleteIcon />
                </IconButton>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name={`products.${index}.partNumber`}
                      label="Part Name"
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name={`products.${index}.description`}
                      label="Part Description"
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name={`products.${index}.soNumber`}
                      label="SO Number"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name={`products.${index}.quantity`}
                      label="Quantity"
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name={`products.${index}.unitCost`}
                      label="Unit Cost [USD]"
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name={`products.${index}.unitWeight`}
                      label="Unit Weight"
                      type="number"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <input
                      accept="image/*,.pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      id={`product-file-${index}`}
                      type="file"
                      multiple
                      onChange={(event) => {
                        const files = Array.from(event.target.files);
                        form.setFieldValue(`products.${index}.documents`, files);
                      }}
                    />
                    <label htmlFor={`product-file-${index}`}>
                      <Button variant="outlined" component="span">
                        Upload Documents
                      </Button>
                    </label>
                    <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
                      * Please provide an invoice or relevant documentation to substantiate the item's value
                    </Typography>
                    {form.values.products[index].documents.length > 0 && (
                      <Box mt={1}>
                        <Typography variant="body2" color="textSecondary">
                          {form.values.products[index].documents.length} file(s) selected
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            ))}

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() =>
                push({
                  partNumber: '',
                  description: '',
                  soNumber: '',
                  quantity: '',
                  unitCost: '',
                  unitWeight: '',
                  documents: [],
                })
              }
            >
              Add Product
            </Button>
          </div>
        )}
      </FieldArray>
    </>
  );
};

export default ProductInformation; 