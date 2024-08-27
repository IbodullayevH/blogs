const blogs_rout = require(`express`).Router()

const { new_blog } = require("../controller/blogs/create-update-delete/createBlog")
const { get_my_blogs } = require("../controller/blogs/get/getBlogs")
const verify_token = require("../middlewares/verify_token")


blogs_rout.post("/blog/create", new_blog)
blogs_rout.get("/blog/get-my-blogs", verify_token(), get_my_blogs)

module.exports = blogs_rout