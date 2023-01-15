import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header/index';
import ToDo from './Components/ToDo/ToDo';
import { When } from 'react-if';
import { AuthContext } from './Context/Auth';
import SettingsForm from './Components/SettingsForm/SettingsForm'
import Footer from '../src/Components/Footer/index.jsx';

export default function App() {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Header />
        <When condition={isLoggedIn}>
          <Routes>
            <Route path="/" element={<ToDo />} />
            <Route path="/settings" element={<SettingsForm />} />
          </Routes>
        </When>
        <Footer/>
      </BrowserRouter>
    </>
  );
}
