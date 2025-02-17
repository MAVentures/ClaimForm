import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useFormikContext } from 'formik';

const SectionTitle = ({ children }) => (
  <Typography
    variant="h6"
    gutterBottom
    sx={{
      mt: 2,
      mb: 1,
      color: 'primary.main',
    }}
  >
    {children}
  </Typography>
);

const InfoSection = ({ title, data }) => (
  <>
    <SectionTitle>{title}</SectionTitle>
    <Grid container spacing={2}>
      {Object.entries(data).map(([key, value]) => (
        <Grid item xs={12} sm={6} key={key}>
          <Typography variant="subtitle2" color="textSecondary">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </Typography>
          <Typography variant="body1">{value || 'N/A'}</Typography>
        </Grid>
      ))}
    </Grid>
  </>
);

const Summary = () => {
  const { values } = useFormikContext();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  const calculateTotal = () => {
    const productTotal = values.products.reduce(
      (sum, product) => sum + product.quantity * product.unitCost,
      0
    );
    const additionalTotal = values.additionalCosts.reduce(
      (sum, cost) => sum + Number(cost.amount),
      0
    );
    return productTotal + additionalTotal;
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom align="center">
        Claim Summary
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <InfoSection
        title="Claim Information"
        data={{
          'Claim Type': values.claimType,
          'MAV Inc REF#': values.mavRef,
          'Shipment Date': values.shipmentDate
            ? new Date(values.shipmentDate).toLocaleDateString()
            : '',
        }}
      />

      <InfoSection
        title="Claimant Information"
        data={{
          Name: values.claimantName,
          Email: values.claimantEmail,
          Phone: values.claimantPhone,
          Address: `${values.claimantAddress}, ${values.claimantCity}, ${values.claimantState} ${values.claimantZip}, ${values.claimantCountry}`,
        }}
      />

      <InfoSection
        title="Shipper Information"
        data={{
          Name: values.shipperName,
          Email: values.shipperEmail,
          Phone: values.shipperPhone,
          Address: `${values.shipperAddress}, ${values.shipperCity}, ${values.shipperState} ${values.shipperZip}, ${values.shipperCountry}`,
        }}
      />

      <InfoSection
        title="Consignee Information"
        data={{
          Name: values.consigneeName,
          Email: values.consigneeEmail,
          Phone: values.consigneePhone,
          Address: `${values.consigneeAddress}, ${values.consigneeCity}, ${values.consigneeState} ${values.consigneeZip}, ${values.consigneeCountry}`,
        }}
      />

      <SectionTitle>Products</SectionTitle>
      <List>
        {values.products.map((product, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={`${product.partNumber} - ${product.description}`}
              secondary={
                <>
                  <Typography variant="body2">
                    Quantity: {product.quantity} | Unit Cost:{' '}
                    {formatCurrency(product.unitCost)}
                  </Typography>
                  <Typography variant="body2">
                    Total: {formatCurrency(product.quantity * product.unitCost)}
                  </Typography>
                  {product.documents.length > 0 && (
                    <Typography variant="body2">
                      Attached Documents: {product.documents.length}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <SectionTitle>Additional Costs</SectionTitle>
      <List>
        {values.additionalCosts.map((cost, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={cost.type}
              secondary={
                <>
                  <Typography variant="body2">{cost.description}</Typography>
                  <Typography variant="body2">
                    Amount: {formatCurrency(cost.amount)}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" align="right">
          Total Claim Amount: {formatCurrency(calculateTotal())}
        </Typography>
      </Box>

      {values.documents.length > 0 && (
        <>
          <SectionTitle>Attached Documents</SectionTitle>
          <List>
            {values.documents.map((file, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={file.name}
                  secondary={`Size: ${
                    file.size < 1024
                      ? file.size + ' B'
                      : file.size < 1048576
                      ? (file.size / 1024).toFixed(1) + ' KB'
                      : (file.size / 1048576).toFixed(1) + ' MB'
                  }`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default Summary; 