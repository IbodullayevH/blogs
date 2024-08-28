const blogSchema = require("../../schema/blogSchema");
const commentSchema = require("../../schema/commentSchema");
const postSchema = require(`../../schema/postSchema`);
// create blog
const new_post = async (req, res) => {
  try {
    const { blog_id, title, content } = req.body;
    const userId = req.userId;

    const blog = await blogSchema.findOne({ author: userId, _id: blog_id });

    if (!blog) {
      return res.status(403).send("Faqatgina blogni egasi post yarataoladi!");
    }

    const newPost = await postSchema.create({
      blog_id,
      user_id: userId,
      title,
      content,
    });

    // Yangi postni blogning posts arrayiga qo'shish
    blog.posts.push(newPost._id);
    await blog.save();

    res.status(201).send({
      success: true,
      message: "Post created",
      data: newPost,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

//get-all
const get_all = async (req, res) => {
  try {
    let { id } = req.params;
    let blog = await blogSchema.findById(id).populate("posts");

    res.send({
      success: true,
      message: "Successfully",
      data_blog_posts: blog.posts,
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

//get-by-id
const get_by_id = async (req, res) => {
  try {
    let { id } = req.params;

    let post = await postSchema.findById(id);

    post.views = (post.views || 0) + 1;
    await post.save();

    res.send({
      success: true,
      message: "Successfully",
      post_data: post,
    });
  } catch (error) {
    return res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// update post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.userId;

    // Postni topish
    const post = await postSchema.findById(id);

    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post topilmadi.",
      });
    }
    console.log(userId);

    // Faqat post egasi o'z postini yangilashi mumkin
    if (post.user_id.toString() !== userId) {
      return res.status(403).send({
        success: false,
        message: "Faqat post egasi yangilashi mumkin.",
      });
    }

    // Postni yangilash
    post.title = title || post.title;
    post.content = content || post.content;

    // Yangilangan postni saqlash
    await post.save();

    res.status(200).send({
      success: true,
      message: "Post muvaffaqiyatli yangilandi.",
      data: post,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// delete
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const post = await postSchema.findById(id);

    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post topilmadi.",
      });
    }

    if (post.user_id.toString() !== userId) {
      return res.status(403).send({
        success: false,
        message: "Faqat post egasi o'chirishi mumkin.",
      });
    }

    await post.deleteOne();

    res.status(200).send({
      success: true,
      message: "Post muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// sort posts by date
const sortByDate = async (req, res) => {
  try {
    const { blog_id } = req.params;

    const posts = await postSchema.find(blog_id).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Postlar sanasi bo'yicha muvaffaqiyatli saralandi.",
      data: posts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


// get comments by post
const getComments = async (req, res) => {
  try {
    const { post_id } = req.params; // URL'dan post_id ni olish

    const comments = await commentSchema.find({ post_id }).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Izohlar muvaffaqiyatli olindi.",
      data: comments,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  new_post,
  get_all,
  get_by_id,
  updatePost,
  deletePost,
  sortByDate,
  getComments
};
