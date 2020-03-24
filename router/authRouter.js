const authRouter = require("express").Router()
const bc = require("bcryptjs")
const userModel = require("../models/userModel")

authRouter.post("/register", (req, res) => {
    const user = req.body
    const hashPassword = bc.hashSync(user.password)
    user.password = hashPassword
    userModel.add(user)
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        res.status(500).end()
    })
})

authRouter.post("/login", (req, res) => {
    const {username, password} = req.body
    userModel.findBy({username})
    .then(user => {
        if(bc.compareSync(password, user.password)) {
            res.json(user) 
        } else {
           res.status(401).end()
        }
    })
    .catch(err => {
        res.status(500).end()
    })
})


module.exports = authRouter