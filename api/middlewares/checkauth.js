const jwt = require('jsonwebtoken');
const env = require('../../env');

module.exports = (req,res,next) =>{
  jwt.verify(req.headers.authorization.split(' ')[1] ,env.JWT_SECRET, function(err, decoded) {
    if(err){
      res.status(400).json({
        'error': err
      });
    }
    if(decoded){
      req.userData = decoded;
      next();
    }
  });
}