import React from 'react';
import './assets/css/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
