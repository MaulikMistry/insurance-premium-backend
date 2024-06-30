const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');

exports.authenticateToken = (req, res, next)=> {
    
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, "config.secret", (err, user) => {
    
    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

exports.authenticateSuperAdmin = (req,res, next)=>{
  
  const auth = req.headers['authorization']
  const token = auth && auth.split(" ")[1]
  if(token == null)
  {
    return res.sendStatus(401)
  }
  jwt.verify(token,"config.secret",(err,user)=>{
    
    if(err) return  res.sendStatus(403) 
    // if(user.role != "superAdmin") return res.sendStatus(401)    
    next()
    
  })
}

exports.createProduct =(req,res,next)=>{
  const auth = req.headers["authorization"]
  const token = auth.split(" ")[1]

  if(token == null) return res.sendStatus(401)

  jwt.verify(token, "config.secret", (err, user) => {

    if (err) return res.sendStatus(403)
    
    req.user = user
    console.log('user: ', user.role ,user.role != "superAdmin");

    if(user.role != "dealer" && user.role != "admin" && user.role != "superAdmin") return res.sendStatus(405)
    if (user.role !== "dealer") {
      req.body.isProductVerified = true;
    }
    
    next()

  })

}