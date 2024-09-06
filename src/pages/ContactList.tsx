import React from 'react';
// import {Card } from '@mui/material';
import StickyHeadTable from '../components/ContactListCard';
import { Grid, Typography } from '@mui/material';

const Contact: React.FC = () => {
  return (
    <Grid container>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: 'bold' // Applying bold font weight
        }}
      >
        Contact List
      </Typography>
      <Grid item xs={12}>
        {' '}
        {/* This ensures it takes full width */}
        <StickyHeadTable />
      </Grid>
    </Grid>
  );
};

export default Contact;
