import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setLoginError('Veuillez renseigner tous les champs.');
        return;
      }
  
      console.log('Email:', email);
      console.log('Password:', password);
  
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
  
      console.log('Server response:', response.data);
  
      navigate('/forum');
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className={'forum-container'}>
      <h1>Hackaton Forum</h1>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Mot de passe:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <div className={'login'}>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
      

      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>
  );
};

export default Login;
