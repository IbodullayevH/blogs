const comment_rout = require(`express`).Router();
const { createComment, updateComment, deleteComment } = require("../controller/comments/comments");
const verify_token = require("../middlewares/verify_token");


comment_rout.post("/comment/create", verify_token(), createComment)
comment_rout.patch("/comment/update/:id", verify_token(), updateComment)
comment_rout.delete("/comment/delete/:id", verify_token(), deleteComment)


module.exports = comment_rout;
