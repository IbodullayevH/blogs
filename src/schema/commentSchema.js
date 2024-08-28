const { Schema, model, Types } = require("mongoose");

const commentSchema = new Schema(
  {
    post_id: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true, 
    },
    content: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true },
  {
    Collection: "Comments", 
  }
);

module.exports = model("Comment", commentSchema);
