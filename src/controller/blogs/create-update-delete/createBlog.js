const blogSchema = require("../../../schema/blogSchema");
const UsersSchema = require("../../../schema/UsersSchema");
const { verify_mtd } = require("../../../utils/jwt");

// create blog
const new_blog = async (req, res) => {
  try {
    let { title, description, posts } = req.body;
    let { token } = req.headers;

    if (!token) {
      res.status(404).send({
        success: false,
        message: "Login qiling va tokenni kiriting",
      });
      return;
    }

    let { id } = verify_mtd(token);

    let user = await UsersSchema.findById(id);
    let author = user.fullName;
    let newBlog = await blogSchema.create({
      title,
      description,
      author: user._id,
      posts,
    });

    res.status(201).send({
      success: true,
      message: "Blog created",
      data: {
        id: newBlog._id,
        title: title,
        description: description,
        posts: newBlog.posts,
        author,
        createdAt: newBlog.createdAt,
        updatedAt: newBlog.updatedAt,
      },
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// /join-blog
const join_blog = async (req, res) => {
  try {
    let { blogId } = req.body;
    let { token } = req.headers;

    if (!token) {
      res.status(404).send({
        success: false,
        message: "Login qiling va tokenni kiriting",
      });
      return;
    }

    let { id } = verify_mtd(token);

    let user = await UsersSchema.findById(id);
    // console.log(user);

    let checkBlogById = await blogSchema.findById(blogId);
    checkBlogById.blog_members.push(user._id);
    checkBlogById.save();

    res.status(201).send({
      success: true,
      message: ` ${user.fullName} siz: '${checkBlogById.title}' blogiga qo'shildingiz`,
      blog_author: await UsersSchema.findById(checkBlogById.author).select(
        "fullName"
      ),
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  new_blog,
  join_blog,
};
