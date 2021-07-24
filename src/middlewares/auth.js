const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {

  // Middleware for auth should be written here
  console.log(req.headers['authorization']);
  const auth  = req.headers['authorization'] ;
    
  if(!auth) 
      return res.status(401).send('Unauthorised Access');
  
  jwt.verify(auth, process.env.jwtPrivateKey);
  next();
};
