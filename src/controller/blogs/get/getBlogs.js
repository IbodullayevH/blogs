// const verify_token = require("../../../middlewares/verify_token");
const blogSchema = require("../../../schema/blogSchema");
const UsersSchema = require("../../../schema/UsersSchema");

//get-my-blogs
const get_my_blogs = async (req, res) => {
  try {
    let userId = req.userId;
    
    
    let blogs = await blogSchema.find({ author: userId });
    let author = await UsersSchema.findById({ _id: userId });
    let joinUser = await UsersSchema.findById(blogs[0].blog_members)
    let membersWithNames = await Promise.all(
      checkBlogById.blog_members.map(async (memberId) => {
        let member = await UsersSchema.findById(memberId);
        return member ? member.fullName : null;
      })
    );
    
    
    res.status(200).send({
      success: true,
      data: blogs.map((blog) => ({
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        author: author.fullName,    
        posts: blog.posts,
        blog_members: blog.blog_members,
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


//get-my-joined-blogs
const get_my_joined_blogs = async(req, res) => {
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
}

module.exports = {
  get_my_blogs,
  get_my_joined_blogs
};
