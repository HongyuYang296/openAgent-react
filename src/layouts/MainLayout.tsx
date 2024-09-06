import React from 'react';
// import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import '@fontsource-variable/inter/index.css';
import '@fontsource-variable/bricolage-grotesque';

import { useTheme } from '@mui/material/styles';
import { AppBar, CssBaseline, Toolbar } from '@mui/material';

interface LayoutProps {
  title?: string;
}

const MainLayout: React.FC<LayoutProps> = ({ title }) => {
  console.log(title);
  const theme = useTheme();

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          height: '64px'
        }}
      >
        <Toolbar>
          <Navbar />
        </Toolbar>
      </AppBar>

      {/* main content */}
      <main style={{ marginTop: '80px', padding: '16px', maxWidth: '100vw', overflowX: 'hidden' }}>
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
