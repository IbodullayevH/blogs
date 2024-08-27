// const verify_token = require("../../../middlewares/verify_token");
const blogSchema = require("../../../schema/blogSchema");
const UsersSchema = require("../../../schema/UsersSchema");

//get-my-blogs
const get_my_blogs = async (req, res) => {
  try {
    let userId = req.userId;

    let blogs = await blogSchema.find({ author: userId });
    let author = await UsersSchema.findById({ _id: userId });

    res.status(200).send({
      success: true,
      data: blogs.map((blog) => ({
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        author: author.fullName, // Barcha bloglar uchun muallif ismi bir xil bo'ladi
        posts: blog.posts,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        __v: blog.__v,
      })),
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  get_my_blogs,
};
