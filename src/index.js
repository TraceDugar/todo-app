import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SettingsProvider from './Context/Settings/index';
import { MantineProvider } from '@mantine/core';
import AuthProvider from './Context/Auth/index'

// This is The Top Level of the App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* Glocalized Style for the App */}
    <MantineProvider withGlobalStyles withNormalizeCSS>

      {/* Auth Provider for the App */}
      <AuthProvider>

        {/* Global Settings for the App */}
        <SettingsProvider>

          {/* The App itself */}
          <App />
        </SettingsProvider>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);