// src/pages/ContactPage.tsx
import React from 'react';
import { Box, Grid, Typography, Link, Card } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import ContactForm from '../components/ContactForm'; // Adjust path as necessary

const MapIcon = LocationOnIcon;
const PhoneIcon = LocalPhoneIcon;
const ContactPage: React.FC = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, fontFamily: 'Gill Sans', }}>
      <div style={{textAlign:'center'}}>
      <Typography
        variant="h4"
        sx={{
          mb: 1,
          fontWeight: 'bold' // Applying bold font weight
        }}
      >
        Contact
      </Typography>
      <Typography variant="h6" component="h1" sx={{ color: 'gray', mb: 1 }}>
        We are here to help.
      </Typography>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: '30px',
              marginTop: '70px',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Box
              sx={{
                ml: 14,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // This keeps the whole group centered vertically
                justifyContent: 'center' // This centers the group horizontally in the outer container
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 2,
                  width: '100%',
                  justifyContent: 'flex-start' // Changes here to align items to the left
                }}
              >
                <Typography variant="h5">Contact OpenAgent</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 4,
                  width: '100%',
                  justifyContent: 'flex-start' // Aligns items to the left
                }}
              >
                <EmailIcon />
                <Link href="mailto:support@openagent.com.au" sx={{ ml: 2 }}>
                  support@openagent.com.au
                </Link>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 1,
                  width: '100%',
                  justifyContent: 'flex-start' // Aligns items to the left
                }}
              >
                <PhoneIcon />
                <Link href="tel:13 24 34" sx={{ ml: 2 }}>
                  13 24 34
                </Link>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 1,
                  width: '100%',
                  justifyContent: 'flex-start' // Changes here to align items to the left
                }}
              >
                <MapIcon />
                <Typography sx={{ ml: 2 }}>PO Box 419, Alexandria NSW 1435</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 2,
                  width: '100%',
                  justifyContent: 'flex-start' // Changes here to align items to the left
                }}
              >
                <Typography variant="h6">Contact centre hours of operation</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 2,
                  width: '100%',
                  justifyContent: 'flex-start' // Changes here to align items to the left
                }}
              >
                <AccessTimeIcon />
                <Typography sx={{ ml: 2 }}>Monday - Friday 8:30 - 5:00</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <ContactForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactPage;
