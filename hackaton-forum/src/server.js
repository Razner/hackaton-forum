const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('DB.sqlite', (err) => {
  if (err) {
    console.error('Could not connect to database:', err.message);
  } else {
    console.log('Connected to the database');
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
        idProfil INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
        email TEXT NOT NULL, 
        password TEXT NOT NULL, 
        skills TEXT, 
        FOREIGN KEY("skills") REFERENCES "skills"("IdSkills")
      )
    `);
  }
});

app.post('/register', (req, res) => {
  const { email, password, skills } = req.body;

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hashedPassword/*enzo?*/) => {
    if (err) {
      console.error('Error during password hashing:', err.message);
      res.status(500).json({ message: 'Registration failed' });
    } else {
      db.run('INSERT INTO users (email, password, skills) VALUES (?, ?, ?)', [email, hashedPassword, JSON.stringify(skills)], function (err) {
        if (err) {
          console.error('Error during registration:', err.message);
          res.status(500).json({ message: 'Registration failed' });
        } else {
          console.log('New user registered with id:', this.lastID);
          res.status(200).json({ message: 'Registration successful', userId: this.lastID });
        }
      });
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      console.error('Error during login:', err.message);
      res.status(500).json({ message: 'Login failed' });
    } else if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          console.error('Invalid password');
          res.status(401).json({ message: 'Login failed. Please check your email and password.' });
        } else {
          res.status(200).json({ message: 'Login successful' });
        }
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});