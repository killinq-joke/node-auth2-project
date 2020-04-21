const router = require("express").Router();
const md = require("../user/user-model");
const bc = require("bcryptjs");

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
        res.status(200).json({message: "come in"})
      } else {
        res.status(401).json({you: "shall not pass"})
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
