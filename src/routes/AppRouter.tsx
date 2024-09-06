import React from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import ContactList from '../pages/ContactList';

type CustomRouteConfig = RouteObject & {
  element: React.ReactNode; // JSX elements are of type React.ReactNode
  children?: CustomRouteConfig[]; // Recursively apply the same type for nested routes
};

const routes: CustomRouteConfig[] = [
  {
    path: '/',
    element: <MainLayout title="Home Layout" />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'contact', element: <Contact /> },
      { path: 'contactList', element: <ContactList /> }
    ]
  }
];

export default routes;
