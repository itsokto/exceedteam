const db = require("../models");
const jwtTokenService = require("../services/jwt.token.service");

const User = db.users;

// Register and Save a new User
exports.register = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res
      .status(400)
      .send({ message: "Username and password can not be empty!" });
    return;
  }

  const user = new User({
    name: name,
    password: password,
  });

  await user.save();

  const token = jwtTokenService.sign(user);

  const refreshToken = jwtTokenService.signRefresh(user);

  res.send({
    accessToken: token,
    refreshToken: refreshToken,
  });
};

// Login a User
exports.login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res
      .status(400)
      .send({ message: "Username and password can not be empty!" });
    return;
  }

  const user = await User.findOne({ name: name });

  if (!user) {
    res.status(400).send({ message: "User not found!" });
    return;
  }

  const token = jwtTokenService.sign(user);

  const refreshToken = jwtTokenService.signRefresh(user);

  const isPasswordValid = user.password === password;

  if (isPasswordValid) {
    res.send({
      accessToken: token,
      refreshToken: refreshToken,
    });
  } else {
    res.status(401).send({ message: "Username or password is invalid" });
  }
};

// Refresh a Token
exports.refresh = async (req, res) => {
  jwtTokenService.verify(req.body.refreshToken, async function (err, decoded) {
    if (err)
      return res.status(403).send({ message: "Token is expired or invalid." });

    const user = await User.findById(decoded.id);

    const token = jwtTokenService.sign(user);

    const refreshToken = jwtTokenService.signRefresh(user);

    res.send({
      accessToken: token,
      refreshToken: refreshToken,
    });
  });
};
