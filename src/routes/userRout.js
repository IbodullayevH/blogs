const user_rout = require(`express`).Router()
const login_user = require("../controller/users/login")
const register_new_user = require("../controller/users/register")


user_rout.post("/user/register", register_new_user)
user_rout.post("/user/login", login_user)

module.exports = user_rout