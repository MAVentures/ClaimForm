import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  MenuItem,
} from '@mui/material';
import { Field, FieldArray, useFormikContext } from 'formik';
import { TextField } from 'formik-mui';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';

const costTypes = [
  { value: 'shipping', label: 'Shipping' },
  { value: 'handling', label: 'Handling' },
  { value: 'storage', label: 'Storage' },
  { value: 'repair', label: 'Repair' },
  { value: 'other', label: 'Other' },
];

const formatFileSize = (size) => {
  if (size < 1024) return size + ' B';
  if (size < 1048576) return (size / 1024).toFixed(1) + ' KB';
  return (size / 1048576).toFixed(1) + ' MB';
};

const CombinedDataInformation = () => {
  const { values, setFieldValue } = useFormikContext();

  const removeFile = (index) => {
    const newFiles = [...values.documents];
    newFiles.splice(index, 1);
    setFieldValue('documents', newFiles);
  };

  return (
    <Grid container spacing={4}>
      {/* Product Information Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Product Information
        </Typography>
        <FieldArray name="products">
          {({ push, remove, form }) => (
            <div>
              {form.values.products.map((product, index) => (
                <Paper key={index} elevation={2} sx={{ p: 3, mb: 3, position: 'relative' }}>
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
      </Grid>

      {/* Additional Costs Section */}
      <Grid item xs={12}>
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
      </Grid>

      {/* Document Upload Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Document Upload
        </Typography>

        <Paper sx={{ p: 2, mb: 3, backgroundColor: 'info.lighter' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', color: 'info.dark' }}>
            Recommended Documents for Claims:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            <Typography component="li" variant="body2" color="info.dark">Commercial Invoice or Purchase Order</Typography>
            <Typography component="li" variant="body2" color="info.dark">Bill of Lading or Air Waybill</Typography>
            <Typography component="li" variant="body2" color="info.dark">Packing List</Typography>
            <Typography component="li" variant="body2" color="info.dark">Photos of Damaged Items</Typography>
            <Typography component="li" variant="body2" color="info.dark">Inspection Reports (if available)</Typography>
            <Typography component="li" variant="body2" color="info.dark">Repair Estimates or Invoices</Typography>
            <Typography component="li" variant="body2" color="info.dark">Delivery Receipt with Noted Damages</Typography>
            <Typography component="li" variant="body2" color="info.dark">Police Report (if theft or vandalism)</Typography>
          </Box>
        </Paper>

        {values.documents.length > 0 && (
          <Paper sx={{ mt: 3 }}>
            <List>
              {values.documents.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={file.name}
                    secondary={formatFileSize(file.size)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeFile(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Select Files
            <input
              type="file"
              hidden
              multiple
              onChange={(event) => {
                const files = Array.from(event.target.files);
                setFieldValue('documents', [...values.documents, ...files]);
              }}
              accept="image/*,.pdf,.doc,.docx"
            />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CombinedDataInformation; 