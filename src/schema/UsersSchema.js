const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role:{
      type: String,
      default: "user"
    }
  },
  {
    Collection: "User",
  }
);

module.exports = model("Users", usersSchema);
