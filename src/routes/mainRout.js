const blogs_rout = require("./blogsRout");
const user_rout = require("./userRout");

const mainRout = require(`express`).Router();

mainRout.use(user_rout);
mainRout.use(blogs_rout);

module.exports = mainRout;
