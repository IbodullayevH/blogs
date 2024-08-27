const usersSchema = require("../../schema/UsersSchema");
const { sign_mtd } = require("../../utils/jwt");

const login_user = async (req, res) => {
  try {
    let { userName, password } = req.body;
    let checkUser = await usersSchema.findOne({ userName, password });
    if (checkUser === null) {
      return res.status(404).send({
        success: false,
        message: "Not found user",
      });
    }

    let token = await sign_mtd({ id: checkUser._id });

    res.status(201).send({
      success: true,
      message: "You are logined",
      data: {
        username: checkUser.userName,
        password: checkUser.password,
      },
      token: token,
    });
  } catch (error) {
    res.status(error.status || 500);
  }
};

module.exports = login_user;
