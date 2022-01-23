const { jwt, verify } = require("jsonwebtoken");
require("dotenv").config()

exports.jwtAuth = {

  verifyUser: (req, res, next) => {
    
    let token = req.headers["authorization"].split(" ")[1];
    
    
    if (!token) return res.status(403).send({ message: "Unauthorised Access" });

    verify(token, process.env.secret, (err, decode) => {
      if (err) return res.status(400).send({ message: "forbidden access" });

console.log(decode);
      if (decode.userType != "superadmin")
        return res.status(401).send({ message: "forbidden access" });
        console.log('hello')
        
      req.userId = decode.id;


      next();
    });
  }
}