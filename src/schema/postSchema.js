const { Schema, model, Types } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    blog_id: [
      {
        type: Types.ObjectId,
        ref: "Blog",
      },
    ],
    user_id: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],

    content: {
      type: String,
    },

    views: {
      type: Number,
    },
  },
  { timestamps: true },
  {
    Collection: "Posts",
  }
);

module.exports = model("Post", postSchema);
