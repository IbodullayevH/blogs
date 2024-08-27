const UsersSchema = require("../schema/UsersSchema");
const { verify_mtd } = require("../utils/jwt");

const verify_token = () => {
  return async (req, res, next) => {
   try {
    let { token } = req.headers;

    if (!token) {
      res.status(404).send({
        success: false,
        message: "🧐 Token not available 🤷‍♂️",
      });
      return;
    }

    let { id } = verify_mtd(token);
    
    let user = await UsersSchema.findById(id);
    
    if (user) {
      req.userId = user.id;
      next();
      
    } else {
      res.status(403).send({
        success: false,
        message: "token error ⚡",
      });
    }
   } catch (error) {
    return res.status(404).send({
      success: false,
      message: error.message,
    });
   }
  };
};

module.exports = verify_token;
