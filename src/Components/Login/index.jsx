import { useContext, useState } from 'react';
import { Button, Group, TextInput } from '@mantine/core';
import { If, Then, Else } from 'react-if';
import { AuthContext } from '../../Context/Auth';

// Login Logic

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
          <Button color='red' onClick={handleLogout}>Log Out</Button>
        </Then>
        <Else>
          <Group>
            <TextInput
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
            />
            <TextInput
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
            <Button color='gray.8' onClick={() => login(username, password)}>Login</Button>
          </Group>
        </Else>
      </If>
    </>
  )
};

export default Login;
