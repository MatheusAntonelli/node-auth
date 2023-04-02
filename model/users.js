const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
   
    try {
      const { rows } = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
        [name, email, hashedPassword]
      );
      const userId = rows[0].id;
      res.json({ userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = rows[0];
  
      if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password.toString());
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }
  
      res.json({ userId: user.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;