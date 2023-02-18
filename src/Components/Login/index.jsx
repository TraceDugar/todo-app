import { useContext, useState } from 'react';
import { Button, Group, TextInput, PasswordInput } from '@mantine/core';
import { If, Then, Else } from 'react-if';
import { AuthContext } from '../../Context/Auth';

//  This is the portion of the app that handles logging in

const Login = () => {

  // Hooks for Login Data 
  const { login, logout, isLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Logout
  const handleLogout = () => {
    setUsername('');
    setPassword('');
    logout();
  }

  return (
    <>

      {/* Conditional Logic For handling login */}
      <If condition={isLoggedIn}>
        <Then>
          <Button color='red.7' onClick={handleLogout}>Log Out</Button>
        </Then>
        <Else>
          <Group>

            {/* Username Entry Field */}
            <TextInput
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
            />

            {/* Password Entry Field */}
            <PasswordInput
              style={{width: '180px'}}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />

            {/* Login button */}
            <Button color='green.7' onClick={() => login(username, password)}>Login</Button>
          </Group>
        </Else>
      </If>
    </>
  )
};

export default Login;
