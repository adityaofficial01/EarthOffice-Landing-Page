import React from 'react'
import {RouterKeys} from "./RouterKey";
import ErrorBoundary from "ErrorBoundary";
// import CommonLayout from "layouts/CommonLayout";
import LandingLayout from 'layouts/LandingLayout';
import Home from 'screens/Landing/Home';
import Privacy from 'screens/Landing/privacyPolicy';
import TermsAndContions from 'screens/Landing/termsConditions';
import AboutUs from 'screens/Landing/AboutUs';

// Lazy load components

// 404
const NotFound = React.lazy(() => import("NotFound"));

// *************** Protected Routes ***************

export const AppRouter = [
  // Common (Terms & Privacy)
  // {
  //   element:
  //     <ErrorBoundary>
  //       <CommonLayout />
  //     </ErrorBoundary>,
  //   children: [
     
  //   ],
  // },

  // Auth Routes
  {
    path: RouterKeys.HOME.HOME,
    element:
      <ErrorBoundary>
        <LandingLayout/>
      </ErrorBoundary>,
    // Apply AuthLayout to non-auth routes
    children: [
      {
        path: RouterKeys.HOME.HOME,
        element: <Home />,
      },
      {
        path: RouterKeys.HOME.ABOUTUS,
        element: <AboutUs />,
      },
      {
        path: RouterKeys.COMMON.PRIVACY,
        element: <Privacy />,
      },
      {
        path: RouterKeys.COMMON.TermsAndConditions,
        element: <TermsAndContions />,
      },
    ],
  },


  // Catch-all Route (404 Not Found)
  {
    path: '*',
    element: (
        <NotFound />
    ),
  },
];
