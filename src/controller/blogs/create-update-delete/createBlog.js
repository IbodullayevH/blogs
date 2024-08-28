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
    let exist = checkBlogById.blog_members.find((el) => el == id);

    if (exist) {
      return res.status(404).send({
        success: false,
        message: `${user.fullName} siz bu blogga avval a'zo bo'lgansiz!`,
      });
    }

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

// delete
const deleteBlog = async (req, res) => {
  try {
    let userId = req.userId;
    let { id } = req.params;

    let blog = await blogSchema.findOne({ author: userId, _id: id });

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete the blog
    await blog.deleteOne();

    res.status(200).send({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// update
const updateBlog = async (req, res) => {
  try {
    let userId = req.userId;
    let { id } = req.params;
    let { title, description, posts } = req.body;
    let blog = await blogSchema.findOne({ author: userId, _id: id });

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete the blog
    await blog.updateOne({ title, description, posts });

    res.status(200).send({
      success: true,
      message: "Updated",
      data: blog,
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// leave
const leaveBlog = async (req, res) => {
  try {
    let userId = req.userId;
    let { id } = req.params;
    // console.log(id);
    
    let blog = await blogSchema.findOne({ author: userId,}).select()
// console.log(blog);

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog topilmadi ",
      });
    }
    
    blog.blog_members = blog.blog_members.filter(
      (el) => el.toString() !== userId
    );
    await blog.save();  

    return res.status(200).send({
      success: true,
      message: "You have successfully left the blog.",
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  new_blog,
  join_blog,
  deleteBlog,
  updateBlog,
  leaveBlog 
};
