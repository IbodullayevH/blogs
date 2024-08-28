// const verify_token = require("../../../middlewares/verify_token");
const blogSchema = require("../../../schema/blogSchema");
const UsersSchema = require("../../../schema/UsersSchema");

//get-my-blogs
const get_my_blogs = async (req, res) => {
  try {
    let userId = req.userId;

    let blogs = await blogSchema.find({ author: userId });

    let author = await UsersSchema.findById({ _id: userId });

    let blogData = await Promise.all(
      blogs.map(async (blog) => {
        let membersWithNames = await Promise.all(
          blog.blog_members.map(async (memberId) => {
            let member = await UsersSchema.findById(memberId);
            return member ? member.fullName : null;
          })
        );

        return {
          _id: blog._id,
          title: blog.title,
          description: blog.description,
          author: author.fullName,
          posts: blog.posts,
          blog_members: membersWithNames,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
          __v: blog.__v,
        };
      })
    );

    res.status(200).send({
      success: true,
      data: blogData,
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// get_my_joined_blogs
const get_my_joined_blogs = async (req, res) => {
  try {
    let userId = req.userId;

    let blogs = await blogSchema.find();
    let get_my_joined_blogs = blogs.filter((el) =>
      el.blog_members.includes(userId)
    );

    res.status(200).send({
      success: true,
      data: get_my_joined_blogs,
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

//get-blog-info
const get_blog_info = async (req, res) => {
  try {
    let { id } = req.params;

    let blogs = await blogSchema.findById(id);

    res.status(200).send({
      success: true,
      data: blogs,
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// search
const searchBlog = async (req, res) => {
  try {
    let { username } = req.body;

    let result = await blogSchema.find({
      $or: [
        { title: { $regex: username, $options: "i" } },
        { description: { $regex: username, $options: "i" } },
      ],
    });

    res.status(200).send({
      success: true,
      message: result,
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// get-users
const get_users = async (req, res) => {
  try {
    let { id } = req.params;

    let blog = await blogSchema.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog topilmadi",
      });
    }

    let members = await Promise.all(
      blog.blog_members.map(async (memberId) => {
        let user = await UsersSchema.findById(memberId).select("fullName ");
        return user
          ? { _id: user._id, fullName: user.fullName, email: user.email }
          : null;
      })
    );

    // Bo'sh qiymatlarni olib tashlash
    let data = members.filter((member) => member !== null);

    res.status(200).send({
      success: true,
      message: data,
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
  get_my_joined_blogs,
  get_blog_info,
  searchBlog,
  get_users,
};
