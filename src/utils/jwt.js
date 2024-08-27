const jwt = require(`jsonwebtoken`);
require("dotenv").config();

const sign_mtd = (payload) => {
  try {
    return jwt.sign(payload, process.env.SECRET_KEY);

  } catch (error) {

    return error.message;
  }
};

const verify_mtd = (token) => {
    try {
  return jwt.verify(token, process.env.SECRET_KEY)
        
    } catch (error) {
        return error.message
    }
};


module.exports = {
    sign_mtd,
    verify_mtd
}