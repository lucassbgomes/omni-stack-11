const fs = require("fs");
const jwt = require("jsonwebtoken");

module.exports = {
  createJWT: id => {
    const privateKey = fs.readFileSync("./private.key", "utf8");
 
    return jwt.sign({id}, privateKey, {
      expiresIn: 1800,
      algorithm: "RS256"
    });
  },
  verifyJWT: (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization === undefined ? null : authorization.split(" ")[1];

    if (!token) return res.sendStatus(401);
    
    const publicKey  = fs.readFileSync("./public.key", "utf8");
    
    jwt.verify(token, publicKey, {algorithm: ["RS256"]}, (err, decoded) => { 
      if (err) 
        return res.status(500).send({ auth: false, message: "Invalid token." }); 
      
      req.ong_id = decoded.id;
      next(); 
    }); 
  }
}