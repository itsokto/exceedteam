const jwtTokenService = require("../services/jwt.token.service");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).send({ message: "No token provided." });

  jwtTokenService.verify(token, function (err, decoded) {
    if (err) return res.status(401).send({ message: "Token is expired." });

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
