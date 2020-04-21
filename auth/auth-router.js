const router = require("express").Router();
const md = require("../user/user-model");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/api/register", (req, res) => {
  const { username, password, department } = req.body;

  const rounds = Number(process.env.SALT);

  const hash = bc.hashSync(password, rounds);

  const user = { username, password: hash, department };

  md.add(user)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  md.findBy({ username })
    .then((user) => {
      if (user && bc.compareSync(password, user[0].password)) {
        const token = generateToken(user[0]);
        res.status(200).json({ message: "come in", token  });
      } else {
        res.status(401).json({ you: "shall not pass" });
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

function generateToken(user) {
  const payload = {
    userID: user.id,
    username: user.username,
    department: user.department
  }

  const secret = require("../secret")

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
