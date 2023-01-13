import React, { useState }from "react";
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability)
  };

  const _validateToken = (token) => {
    try {
      let validUser = jwtDecode(token);
      if (validUser) {
        setUser(validUser);
        setIsLoggedIn(true);
        console.log('We in.');
      }
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  const login = async (username, password) => {
    let authCredentials = [username];

    let config = {
      baseUrl: 'https://api-js401.herokuapp.com',
      url: '/signin',
      method: 'post',
      auth: { username, password }
    }

    let response = await axios(config);
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

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
  };

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
