const jwt = require("jsonwebtoken");
const config = require("../../config");

exports.verifyUser = (req, res, next)  => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(401).send("Invalid token.");
  }
}

exports.checkCookie = (req, res, next) => {
  const token = req.cookies.ospeech_access_token;

  // Add user object to request
  if (token){
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
  }

  return req.next();
}