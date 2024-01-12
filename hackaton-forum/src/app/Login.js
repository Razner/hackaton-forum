import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail/*admin*/] = useState('');
  const [password, setPassword/*1234*/] = useState('');
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setLoginError('Veuillez renseigner tous les champs.');
        return;
      }
  
      console.log('Email:', email);
      console.log('Mot de passe:', password);
  
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
  
      console.log('Server response:', response.data);
  
      navigate('/forum');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setLoginError('Connexion échouée. Vérifie ton mail et ton mot de passe.');
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
