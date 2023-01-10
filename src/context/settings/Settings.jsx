import React, { useState } from 'react';

export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {


  const values = {

  };

  return (
    <SettingsProvider values={values}>
      {children}
    </SettingsProvider>
  )
};

export default SettingsProvider;
