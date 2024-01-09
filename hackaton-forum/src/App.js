import React, { useState } from 'react';

const Forum = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Post 1', skills: ['Dev front'] },
    { id: 2, title: 'Post 2', skills: ['Dev back'] },
    { id: 3, title: 'Post 3', skills: ['Dev fullstack'] },
    { id: 4, title: 'Post 4', skills: ['Cyber'] },
    { id: 5, title: 'Post 5', skills: ['Infra'] },
    { id: 6, title: 'Post 6', skills: ['Réseau'] },
  ]);

  const [selectedSkill, setSelectedSkill] = useState('All');

  const handleSkillChange = (skill) => {
    setSelectedSkill(skill);
  };

  const filteredPosts = selectedSkill === 'All'
    ? posts
    : posts.filter(post => post.skills.includes(selectedSkill));

  return (
    <div style={{ backgroundColor: '#23b2a4', padding: '20px', height: '100vh' }}>
      <div>
        <label>Filtrer par compétence:</label>
        <select
          onChange={(e) => handleSkillChange(e.target.value)}
          value={selectedSkill}
          style={{ margin: '10px', padding: '5px', borderRadius: '5px' }}
        >
          <option value="All">Toutes les compétences</option>
          <option value="Dev front">Dev Frontend</option>
          <option value="Dev back">Dev Backend</option>
          <option value="Dev fullstack">Dev Fullstack</option>
          <option value="Cyber">Cybersécurité</option>
          <option value="Infra">Infrastructure</option>
          <option value="Réseau">Réseau</option>
        </select>
      </div>

      <div>
        <h2>Posts</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredPosts.map(post => (
            <li key={post.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
              {post.title} - Compétences: {post.skills.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Forum;
