const blogs_rout = require(`express`).Router()
const { new_blog, get_my_blogs } = require("../controller/blogs/create-update-delete/createBlog")
const verify_token = require("../middlewares/verify_token")


blogs_rout.post("/blog/create", verify_token(), new_blog)
blogs_rout.get("/blog/get-my-blogs", verify_token(), get_my_blogs)

module.exports = blogs_rout