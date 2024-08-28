const blogs_rout = require("./blogsRout");
const comment_rout = require("./commentRout");
const post_rout = require("./postRout");
const user_rout = require("./userRout");

const mainRout = require(`express`).Router();

mainRout.use(user_rout);
mainRout.use(blogs_rout);
mainRout.use(post_rout);
mainRout.use(comment_rout);

module.exports = mainRout;
