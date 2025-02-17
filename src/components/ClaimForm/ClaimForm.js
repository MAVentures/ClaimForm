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
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import ClaimInformation from './steps/ClaimInformation';
import ClaimantInformation from './steps/ClaimantInformation';
import ShipperInformation from './steps/ShipperInformation';
import ConsigneeInformation from './steps/ConsigneeInformation';
import ProductInformation from './steps/ProductInformation';
import AdditionalCosts from './steps/AdditionalCosts';
import DocumentUpload from './steps/DocumentUpload';
import Summary from './steps/Summary';
import ClaimSubmitted from './steps/ClaimSubmitted';

const steps = [
  'Claim Information',
  'Claimant Information',
  'Shipper Information',
  'Consignee Information',
  'Product Information',
  'Additional Costs',
  'Documents',
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
        return <ClaimantInformation />;
      case 2:
        return <ShipperInformation />;
      case 3:
        return <ConsigneeInformation />;
      case 4:
        return <ProductInformation />;
      case 5:
        return <AdditionalCosts />;
      case 6:
        return <DocumentUpload />;
      case 7:
        return <Summary />;
      case 8:
        return <ClaimSubmitted />;
      default:
        return 'Unknown step';
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // TODO: Implement API call to submit form
      console.log('Form values:', values);
      setIsSubmitted(true);
      handleNext();
    } catch (error) {
      console.error('Error submitting form:', error);
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
          {steps.slice(0, -1).map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {getStepContent(activeStep)}
              
              {!isSubmitted && (
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
                    type={activeStep === steps.length - 2 ? 'submit' : 'button'}
                    onClick={activeStep === steps.length - 2 ? undefined : handleNext}
                    disabled={isSubmitting}
                  >
                    {activeStep === steps.length - 2 ? 'Submit Claim' : 'Next'}
                  </Button>
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ClaimForm; 