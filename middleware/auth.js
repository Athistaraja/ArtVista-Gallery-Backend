// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
      const token = req.header('x-auth-token').replace('Bearer ', '');
      console.log('Received token:', token); // Debug log
  
      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Assuming token contains user ID and role
        next();
    } catch (error) {
      console.error('Token verification error:', error); // Debug log
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
 
// const checkRole = (req, res, next) => {
//     if (req.user.role !== 'artist') {
//       return res.status(403).json({ message: 'Access denied, artist only' });
//     }
//     next();
// };  

const checkRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
 };

module.exports = { auth, checkRole };
