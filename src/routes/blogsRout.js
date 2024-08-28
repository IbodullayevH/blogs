const blogs_rout = require(`express`).Router();

const {
  new_blog,
  join_blog,
  deleteBlog,
  updateBlog,
  leaveBlog,
} = require("../controller/blogs/create-update-delete/createBlog");
const {
  get_my_blogs,
  get_my_joined_blogs,
  get_blog_info,
  searchBlog,
  get_users,
} = require("../controller/blogs/get/getBlogs");
const verify_token = require("../middlewares/verify_token");

blogs_rout.get("/blog/get-my-blogs", verify_token(), get_my_blogs);
blogs_rout.get(
  "/blog/get-my-joined-blogs",
  verify_token(),
  get_my_joined_blogs
);
blogs_rout.get("/blog/get-blog-info/:id", get_blog_info);
blogs_rout.get("/blog/get-users/:id", get_users);
blogs_rout.get("/blog/search", searchBlog);
blogs_rout.post("/blog/create", new_blog);
blogs_rout.post("/blog/join", join_blog);
blogs_rout.delete("/blog/delete/:id", verify_token(), deleteBlog);
blogs_rout.patch("/blog/update/:id", verify_token(), updateBlog);
blogs_rout.delete("/blog/leave/:id", verify_token(), leaveBlog);
module.exports = blogs_rout;
