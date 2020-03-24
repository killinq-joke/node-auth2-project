const userRouter = require("express").Router()
const userModel = require("../models/userModel")

userRouter.get("/", (req, res) => {
    userModel.findAll()
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        res.status(500).end()
    })
})

module.exports = userRouter