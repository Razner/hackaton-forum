import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login.js';
import Forum from './Forum.js';
import Header from '../css/header.jsx';
import Footer from '../css/footer.jsx';
import '../css/App.css';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/" element={<Register />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

const Register = () => {
  /*mise en place de l'API*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [registered, setRegistered] = useState(false);

  const skillsList = ['Dev Frontend', 'Dev Backend', 'Dev Fullstack', 'Cyber', 'Infra', 'Réseau'];

  const handleSkillButtonClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRegister = async () => {
    /*tu sais le truc*/
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.error('Addresse mail non valide');
        return;
      }

      if (password.length < 8) {
        console.error('Le mot de passe doit faire 8 caractères minimum');
        return;
      }
  
      if (selectedSkills.length === 0) {
        console.error('Selectionne au moins 1 compétence');
        return;
      }
  
      const response = await axios.post('http://localhost:3001/register', {
        email,
        password,
        skills: selectedSkills,
      });
  
      console.log(response.data);
      setRegistered(true);
    } catch (error) {
      console.error('Erreur durant l enregistrement:', error);
    }
  };  

  return (
    <div className={'forum-container'}>
      <h1>Hackaton Forum</h1>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Mot de passe:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <div>
        <label>Compétences:</label>
        {skillsList.map(skill => (
          <button
            key={skill}
            onClick={() => handleSkillButtonClick(skill)}
            className={selectedSkills.includes(skill) ? 'clicked' : ''}
          >
            {skill}
          </button>
        ))}
      </div>

    <div className={'register'}>
      <button onClick={handleRegister}>S'enregistrer</button>
      {registered && <Navigate to="/login" />}
    </div>
    </div>
  );
};

export default App;