const customError = require("../helpers/customError");
const User = require("../models/User");

const verif = async (req, res, next) => {
  try {
    const { token } = req.body;
    console.log("TOKEN", token);
    const user = await User.findByVerifToken(token);
    // if the token is corrupted, then throw an error
    if (!user)
      next(customError("Looks like your verification token is corrupted..."));

    // if the token is valid
    console.log("USER", user);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verif;
