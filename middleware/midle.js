const jwt = require('jsonwebtoken');
const {User} = require('../model/users');


const authenticate = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, 'your-secret-key');
      const user = await User.findOne({ where: { id: decoded.id } });
  
      if (!user) {
        throw new Error();
      }
  
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Please authenticate.' });
    }
  };

  module.exports = authenticate;