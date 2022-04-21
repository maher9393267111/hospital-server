const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers; //get token from header
  
console.log('header------->',authorization)

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Missing or invalid token' });
  } else {
    const token = req.headers.authorization.split(" ")[1];
   // const token = authorization.split(' ')[1];

console.log('token--->',token)

    const user = await jwt.verify(token, process.env.JWT_KEY);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
    }
    
    req.user = user;
    console.log('user Role----->🔥🔥🔥🔥🔥',user.role)
    next();
  }
};

module.exports = authMiddleware;