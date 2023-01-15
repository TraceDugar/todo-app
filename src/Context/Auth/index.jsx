import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import cookie from 'react-cookies';

export const AuthContext = React.createContext();

// Auth Hooks

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability)
  };

  // Token Validation

  const _validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      if (validUser) {
        setUser(validUser);
        setIsLoggedIn(true);
        cookie.save('auth', token);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  // Login Logic

  const login = async (username, password) => {
    const config = {
      url: '/signin',
      baseURL: 'https://api-js401.herokuapp.com/',
      method: 'post',
      auth: { username, password }
    }

    const response = await axios(config);
    const { token } = response.data;

    if (token) {
      try {
        _validateToken(token);
      } catch (e) {
        setError(e);
        console.error(e);
      }
    }
  };

  // Logout Logic

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    cookie.remove('auth');
  };

  useEffect(() => {
    let token = cookie.load('auth');
    if (token) {
      _validateToken(token);
    }
  }, []);

  const values = {
    user,
    isLoggedIn,
    error,
    can,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;
