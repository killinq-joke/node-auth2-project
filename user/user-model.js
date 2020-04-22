const db = require("../data/dbConfig");

module.exports = {
  findByDepartment,
  findBy,
  add,
};

function findByDepartment(department) {
  return db("users").where("department", department);
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users").insert(user);
}
