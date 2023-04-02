const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./model/users');
const authenticate = require('./middleware/midle');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRouter);

app.get('/profile', authenticate, (req, res) => {
  res.send(req.user);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});