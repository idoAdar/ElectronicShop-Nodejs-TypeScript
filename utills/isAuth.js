const User = require('../models/User');
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
  const token = req.header('Authentication').split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, process.env.DB_JWT);
    req.currentUser = await User.findById({ _id: decoded.id });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = isAuth;
