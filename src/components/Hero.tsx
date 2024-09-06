import React from 'react';
import heroImage from '../assets/image/hero.png'; // Ensure the path is correct
import { Grid, Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material'; // Import necessary MUI components
import DownloadIcon from '@mui/icons-material/Download'; // Example MUI icon
import GitHubIcon from '@mui/icons-material/GitHub'; // Example MUI icon

const Hero: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.only('md'));

  return (
    <Box component="main" py={4} px={2}>
      <Grid container spacing={4} alignItems="center">
        {/* Text and Links Section (Left side) */}
        <Grid item xs={12} md={isMediumScreen ? 6 : 7} lg={6}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            gutterBottom
            fontSize={{ xs: '2rem', sm: '2.75rem', md: '3.5rem' }}
          >
            Sample task website done with React
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Welcome to OpenAgent. We've been around since 2013, and our vision is to make it easy for people to buy,
            sell and own
          </Typography>

          <Box mt={3} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            {/* Download Button */}
            <Button
              variant="contained"
              color="primary"
              href="https://web3templates.com/templates/astroship-starter-website-template-for-astro"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DownloadIcon />}
              fullWidth={isSmallScreen || isMediumScreen}
              sx={{ py: 1.5 }}
            >
              Download for Free
            </Button>

            {/* GitHub Repo Button */}
            <Button
              variant="outlined"
              color="primary"
              href="https://github.com/surjithctly/astroship"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
              fullWidth={isSmallScreen || isMediumScreen}
              sx={{ py: 1.5 }}
            >
              GitHub Repo
            </Button>
          </Box>
        </Grid>

        {/* Image Section (Right side) */}
        {!isSmallScreen && (
          <Grid item xs={12} md={isMediumScreen ? 6 : 5} lg={6}>
            <Box
              component="img"
              src={heroImage}
              alt="Astronaut in the air"
              loading="lazy"
              width="100%"
              sx={{ maxWidth: { xs: '100%', md: '450px', lg: '500px' } }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Hero;
