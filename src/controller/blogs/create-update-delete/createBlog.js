const blogSchema = require("../../../schema/blogSchema");
const Users = require("../../../schema/UsersSchema");

//get-my-blogs
const get_my_blogs = async (req, res) => {
  try {
    
    let blogs = await blogSchema.find()
    
    

    res.status(200).send({
        success: true,
        message: "get info users blog",
        data: blogs
    })
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// create blog
const new_blog = async (req, res) => {
  try {
    let { title, description, author, posts } = req.body;

    let user = await Users.findById(author).select("fullName");

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    let newBlog = await blogSchema.create({
      title,
      description,
      author,
      posts,
    });

    res.status(201).send({
      success: true,
      message: "Blog created",
      data: {
        id: newBlog._id,
        title: title,
        description: description,
        author: user.fullName,
        posts: newBlog.posts,
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

module.exports = {
  new_blog,
  get_my_blogs
};
