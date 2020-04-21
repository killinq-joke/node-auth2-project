const router = require("express").Router();
const md = require("./user-model");

router.get("/api/users", (req, res) => {
    md.findAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({errorMessage: err.message})
    })
});

module.exports = router;
