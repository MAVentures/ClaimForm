import React, { useState } from 'react';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Typography,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createClaimFolder, uploadFileToDrive } from '../../services/driveService';
import { submitClaimForm } from '../../services/apiService';

import ClaimInformation from './steps/ClaimInformation';
import CombinedAddressInformation from './steps/CombinedAddressInformation';
import CombinedDataInformation from './steps/CombinedDataInformation';
import Summary from './steps/Summary';
import ClaimSubmitted from './steps/ClaimSubmitted';

const steps = [
  'Claim Information',
  'Contact Information',
  'Claim Details',
  'Summary',
  'Submitted',
];

const initialValues = {
  // Claim Information
  claimType: '',
  mavRef: '',
  shipmentDate: null,
  
  // Claimant Information
  claimantName: '',
  claimantPhone: '',
  claimantEmail: '',
  claimantAddress: '',
  claimantCity: '',
  claimantState: '',
  claimantZip: '',
  claimantCountry: '',
  
  // Shipper Information
  shipperName: '',
  shipperPhone: '',
  shipperEmail: '',
  shipperAddress: '',
  shipperCity: '',
  shipperState: '',
  shipperZip: '',
  shipperCountry: '',
  
  // Consignee Information
  consigneeName: '',
  consigneePhone: '',
  consigneeEmail: '',
  consigneeAddress: '',
  consigneeCity: '',
  consigneeState: '',
  consigneeZip: '',
  consigneeCountry: '',
  
  // Product Information
  products: [
    {
      partNumber: '',
      description: '',
      soNumber: '',
      subProduct: '',
      quantity: '',
      unitCost: '',
      unitWeight: '',
      documents: [],
    },
  ],
  
  // Additional Costs
  additionalCosts: [
    {
      type: '',
      description: '',
      amount: '',
    },
  ],
  
  // Documents
  documents: [],
  
  // Summary
  summary: '',
};

const validationSchema = Yup.object().shape({
  claimType: Yup.string().required('Claim type is required'),
  mavRef: Yup.string().required('MAV Inc REF# is required'),
  shipmentDate: Yup.date().required('Shipment date is required').nullable(),
  
  claimantName: Yup.string().required('Full name is required'),
  claimantPhone: Yup.string().required('Phone number is required'),
  claimantEmail: Yup.string().email('Invalid email').required('Email is required'),
  claimantAddress: Yup.string().required('Address is required'),
  claimantCity: Yup.string().required('City is required'),
  claimantState: Yup.string().required('State/Province is required'),
  claimantZip: Yup.string().required('ZIP code is required'),
  claimantCountry: Yup.string().required('Country is required'),
  
  // Add similar validation for shipper and consignee information
  
  products: Yup.array().of(
    Yup.object().shape({
      partNumber: Yup.string().required('Part number is required'),
      description: Yup.string().required('Description is required'),
      quantity: Yup.number().required('Quantity is required').positive(),
      unitCost: Yup.number().required('Unit cost is required').positive(),
    })
  ),
  
  documents: Yup.array().min(1, 'At least one document is required for the claim'),
  
  summary: Yup.string().required('Summary is required'),
});

const ClaimForm = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ClaimInformation />;
      case 1:
        return <CombinedAddressInformation />;
      case 2:
        return <CombinedDataInformation />;
      case 3:
        return <Summary />;
      case 4:
        return <ClaimSubmitted />;
      default:
        return 'Unknown step';
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Form submission started');
      setError(null);
      
      // Create folder structure in Google Drive
      const folderId = await createClaimFolder(values);
      console.log('Folder created:', folderId);
      
      // Upload documents to appropriate subfolders
      const uploadPromises = [];
      
      // Upload claim documents
      if (values.documents && values.documents.length > 0) {
        console.log('Uploading claim documents...');
        for (const doc of values.documents) {
          uploadPromises.push(uploadFileToDrive(doc, folderId));
        }
      }
      
      // Upload product documents
      if (values.products) {
        console.log('Uploading product documents...');
        for (const product of values.products) {
          if (product.documents && product.documents.length > 0) {
            for (const doc of product.documents) {
              uploadPromises.push(uploadFileToDrive(doc, folderId));
            }
          }
        }
      }
      
      await Promise.all(uploadPromises);
      console.log('All documents uploaded successfully');
      
      // Submit form data to API
      const response = await submitClaimForm({
        ...values,
        folderId,
        submittedAt: new Date().toISOString(),
      });
      
      console.log('API Response:', response);
      
      // Set submission state and move to final step
      setIsSubmitted(true);
      setActiveStep(steps.length - 1); // Move to the last step (Submitted)
      console.log('Form submission completed successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred while submitting the form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mt: 3,
          mb: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Freight Claim Form
        </Typography>
        
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ mt: 3, mb: 4 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {isSubmitted ? (
          <ClaimSubmitted />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {getStepContent(activeStep)}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    variant="contained"
                    type={activeStep === steps.length - 2 ? "submit" : "button"}
                    onClick={activeStep !== steps.length - 2 ? handleNext : undefined}
                    disabled={isSubmitting}
                  >
                    {activeStep === steps.length - 2 ? 'Submit Claim' : 'Next'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Paper>
      
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ClaimForm; 