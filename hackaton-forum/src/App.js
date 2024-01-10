import React, { useState } from 'react';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [newPostSkills, setNewPostSkills] = useState('');

  const handleSkillChange = (skill) => {
    setSelectedSkill(skill);
  };

  const handleNewPostDescriptionChange = (e) => {
    setNewPostDescription(e.target.value);
  };

  const handleNewPostSkillsChange = (e) => {
    setNewPostSkills(e.target.value);
  };

  const handleAddPost = () => {
    if (newPostDescription && newPostSkills) {
      const newPost = {
        id: posts.length + 1,
        description: newPostDescription,
        skills: newPostSkills.split(',').map(skill => skill.trim()),
      };
  
      setPosts([...posts, newPost]);
      setNewPostDescription('');
      setNewPostSkills('');
    }
  };

  const filteredPosts = selectedSkill === 'All'
  ? posts
  : posts.filter(post =>
      (post.skills || []).some(skill => skill && skill.toLowerCase().includes(selectedSkill.toLowerCase())) ||
      (post.description && post.description.toLowerCase().includes(selectedSkill.toLowerCase()))
  );

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
        <h2>Créer un nouveau post</h2>
        <div>
          <label>Description:</label>
          <input type="text" value={newPostDescription} onChange={handleNewPostDescriptionChange} />
        </div>
        <div>
          <label>Compétences (séparées par des virgules):</label>
          <input type="text" value={newPostSkills} onChange={handleNewPostSkillsChange} />
        </div>
        <button onClick={handleAddPost}>Ajouter Post</button>
      </div>

      <div>
        <h2>Posts</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredPosts.map(post => (
            <li key={post.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
              {post.description} - Compétences: {post.skills.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Forum;
