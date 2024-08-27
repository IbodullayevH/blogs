const { Schema, model, Types, } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type:Types.ObjectId,
      ref: "User",
      required: true,
    },
    posts: [
      {
        type: Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true },
  {
    Collection:"Blogs"
  }
);

module.exports = model("Blog", blogSchema);
