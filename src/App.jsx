import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header/index';
import ToDo from './Components/ToDo/ToDo';
import { When } from 'react-if';
import { AuthContext } from './Context/Auth';
import SettingsForm from './Components/SettingsForm/SettingsForm'
import Footer from '../src/Components/Footer/index.jsx';


//  This is the actual App

export default function App() {


  // Login Logic
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>

      {/*  Router for the app */}
      <BrowserRouter>

        {/* The Header is outside of the When component to constantly Apper on the App */}
        <Header />

        {/* The When Coponent allows the things within to only be view when logged in and depeneding upon what permissions the user has it may restrict certain permissions at varying degrees as intended */}
        <When condition={isLoggedIn}>

          {/* The Routes Component allows the routing of webpages */}
          <Routes>

            {/* This is the Homepage and its assopciated ToDo component */}
            <Route path="/" element={<ToDo />} />

            {/* This is the settings page and its associated SettingsForm */}
            <Route path="/settings" element={<SettingsForm />} />
          </Routes>
        </When>

        {/* The Header is outside of the When component to constantly Apper on the App */}
        <Footer />
      </BrowserRouter>
    </>
  );
}
