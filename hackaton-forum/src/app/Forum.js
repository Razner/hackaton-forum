import React, { useState } from 'react';
import '../css/Forum.css'; 

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillsList = [
    'Dev Frontend',
    'Dev Backend',
    'Dev Fullstack',
    'Cybersécurité',
    'Infrastructure',
    'Réseau',
  ];

  const handleSkillChange = (skill) => {
    setSelectedSkill(skill);
  };

  const handleNewPostDescriptionChange = (e) => {
    setNewPostDescription(e.target.value);
    /*mmh*/
  };

  const handleSkillButtonClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddPost = () => {
    if (newPostDescription && selectedSkills.length > 0) {
      const newPost = {
        id: posts.length + 1,
        description: newPostDescription,
        skills: selectedSkills,
      };

      setPosts([...posts, newPost]);
      setNewPostDescription('');
      setSelectedSkills([]);
    }
  };

  const filteredPosts = selectedSkill === 'All'
    ? posts
    : posts.filter(post =>
      post.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase())) ||
      (post.description && post.description.toLowerCase(/*???*/ ).includes(selectedSkill.toLowerCase()))
    );

  return (
    <div className="forum-container">
        <h1>Hackaton Forum</h1>
      <div className="filter-section">
        <label>Filtrer par compétence :</label>
        <select
          onChange={(e) => handleSkillChange(e.target.value)}
          value={selectedSkill}
        >
          <option value="All">Toutes les compétences</option>
          {skillsList.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      <div className="create-post-section">
        <h2>Créer un nouveau post</h2>
        <div>
          <label>Description :</label>
          <input type="text" value={newPostDescription} onChange={handleNewPostDescriptionChange} />
        </div>
        <div>
          <label>Compétences :</label>
          <div className="skills-buttons">
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
        </div>
        <div className={'addPost'}>
        <button onClick={handleAddPost}>Ajouter Post</button>
        </div>
      </div>

      <div className="posts-section">
        <h2>Tous les posts</h2>
        <ul>
          {filteredPosts.map(post => (
            <li key={post.id}>
              <div className="post-item">
                <div className="post-description">Description : {post.description}</div>
                <div className="post-skills">Compétences : {post.skills.join(', ')}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Forum;
