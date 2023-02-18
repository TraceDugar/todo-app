import React, { useEffect, useState } from 'react';

export const SettingsContext = React.createContext();

//  This is how the settings are adjusted whenever they are manipulated by the user on the settings form

const SettingsProvider = ({ children }) => {

  // Settings Hooks
  const [showComplete, setShowComplete] = useState(false);
  const [pageItems, setPageItems] = useState(3);
  const [sort, setSort] = useState('difficulty');


  //  Local Storage logic
  const saveLocally = () => {
    localStorage.setItem('todo', JSON.stringify({ pageItems, sort, showComplete }))
  };

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem('todo'));
    if (storage) {
      setShowComplete(storage.showComplete);
      setPageItems(storage.pageItems);
      setSort(storage.sort);
    }
  }, []);

  const values = {
    showComplete,
    pageItems,
    sort,
    setShowComplete,
    setPageItems,
    setSort,
    saveLocally,
  };

  //  Passing Settings to Child Components
  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
};

export default SettingsProvider;
