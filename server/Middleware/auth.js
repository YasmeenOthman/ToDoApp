const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Failed to authenticate token." });
      }
      req.user = user;
      console.log(req.user, "req.user");
      next();
    });
  } else {
    res.status(401).json({ error: "No token provided." });
  }
};

module.exports = verifyToken;
