const db = require("../data/db-configs")

module.exports = {
    findAll,
    findBy,
    add
}

function findAll() {
    return db("users")
}

function findBy(filter) {
    return db("users").where(filter).first()
}

function findById(id) {
    return db("users").where({id})
}

function add(user) {
    return db("users").insert(user)
    .then(id => {
        return findById(id[0])
    })
}