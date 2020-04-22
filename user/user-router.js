const router = require("express").Router();
const md = require("./user-model");
const authenticator = require("../middleware/authenticator");

router.get("/api/users", authenticator, (req, res) => {
    const {department} = req.decodedToken
    md.findByDepartment(department)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: err.message });
      });
});

module.exports = router;
