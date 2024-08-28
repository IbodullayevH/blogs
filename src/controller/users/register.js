const usersSchema = require("../../schema/UsersSchema");

const register_new_user = async (req, res) => {
  try {
    let { fullName, userName, email, password } = req.body;

    const [existUser] = await usersSchema.find({ userName });

    if (existUser) {
      return res.send({
        success: false,
        message: "avval ro'yxatdan o'tgan!",
      });
    }

    let newUser = await usersSchema.create({
      fullName,
      userName,
      email,
      password,
    });

    res.status(201).send({
      success: true,
      message: "You are registered",
      data: newUser,
    });
  } catch (error) {
    res.status(error.status || 500);
  }
};

module.exports = register_new_user;
