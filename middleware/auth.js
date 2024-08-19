// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Assuming token contains user ID and role
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const checkRole = (req, res, next) => {
    if (req.user.role !== 'artist') {
      return res.status(403).json({ message: 'Access denied, artist only' });
    }
    next();
};  


module.exports = { auth, checkRole };
