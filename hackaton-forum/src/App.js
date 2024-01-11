import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login.js';
import Forum from './Forum.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
};

const Register = () => {
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
    try {
      const response = await axios.post('http://localhost:3001/register', {
        email,
        password,
        skills: selectedSkills,
      });

      console.log(response.data);
      setRegistered(true);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <div>
        <label>Skills:</label>
        {skillsList.map(skill => (
          <button
            key={skill}
            onClick={() => handleSkillButtonClick(skill)}
            style={{ margin: '5px', padding: '5px', borderRadius: '5px', backgroundColor: selectedSkills.includes(skill) ? '#fff' : '#ccc' }}
          >
            {skill}
          </button>
        ))}
      </div>

      <button onClick={handleRegister}>Register</button>

      {registered && <Navigate to="/login" />}
    </div>
  );
};

export default App;