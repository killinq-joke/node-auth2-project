const userRouter = require("express").Router();
const userModel = require("../models/userModel");
const mw = require("../middleware");

userRouter.get("/", mw.restricted, (req, res) => {
  userModel
    .findAll()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).json({ message: "you shall not pass" });
    });
});

module.exports = userRouter;
