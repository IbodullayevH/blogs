const post_rout = require(`express`).Router();

const {
  new_post,
  get_all,
  get_by_id,
  updatePost,
  deletePost,
  sortByDate,
  getComments,
} = require("../controller/posts/posts");
const verify_token = require("../middlewares/verify_token");

post_rout.post("/post/create", verify_token(), new_post);
post_rout.get("/post/all/:id", get_all);
post_rout.get("/post/byId/:id", get_by_id);
post_rout.patch("/post/update/:id", verify_token(), updatePost);
post_rout.delete("/post/delete/:id", verify_token(), deletePost);
post_rout.get("/post/sortby/:id", sortByDate);
post_rout.get("/post/getComment/:id", getComments);

module.exports = post_rout;
