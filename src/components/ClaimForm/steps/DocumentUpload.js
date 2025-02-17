import React, { useCallback } from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  FormHelperText,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useFormikContext } from 'formik';

const DocumentUpload = () => {
  const { values, setFieldValue, touched, errors } = useFormikContext();

  const onDrop = useCallback((acceptedFiles) => {
    setFieldValue('documents', [...values.documents, ...acceptedFiles]);
  }, [values.documents, setFieldValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    },
  });

  const removeFile = (index) => {
    const newFiles = values.documents.filter((_, i) => i !== index);
    setFieldValue('documents', newFiles);
  };

  const formatFileSize = (size) => {
    if (size < 1024) return size + ' B';
    else if (size < 1048576) return (size / 1024).toFixed(1) + ' KB';
    else return (size / 1048576).toFixed(1) + ' MB';
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Document Upload
      </Typography>

      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          mb: 3,
          border: '2px dashed',
          borderColor: touched.documents && errors.documents ? 'error.main' : isDragActive ? 'primary.main' : 'divider',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: touched.documents && errors.documents ? 'error.main' : 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 48, mb: 2, color: touched.documents && errors.documents ? 'error.main' : 'primary.main' }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive
              ? 'Drop the files here'
              : 'Drag and drop files here, or click to select files'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported file types: Images, PDF, DOC, DOCX
          </Typography>
          {touched.documents && errors.documents && (
            <FormHelperText error sx={{ mt: 1 }}>
              {errors.documents}
            </FormHelperText>
          )}
        </Box>
      </Paper>

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
    </>
  );
};

export default DocumentUpload; 