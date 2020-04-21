const router = require("express").Router();
const md = require("../user/user-model");
const bc = require("bcryptjs");

router.post("/api/register", (req, res) => {
  const { username, password, department } = req.body;

  const rounds = Number(process.env.SALT)

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

});

module.exports = router;
