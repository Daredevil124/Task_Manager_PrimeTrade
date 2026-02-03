const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // 1. Get token from the headers
  let token = req.header('Authorization');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Note: Tokens are often sent as "Bearer <token_string>", so we split it
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the user ID to the request object so the controller can use it
    req.user = decoded;
    next(); // Move on to the actual API route
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;