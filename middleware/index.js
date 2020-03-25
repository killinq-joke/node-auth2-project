const jwt = require("jsonwebtoken");

module.exports = {
  restricted
};

function restricted(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).end();
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(500).end();
  }
}
