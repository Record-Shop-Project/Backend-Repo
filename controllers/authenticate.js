const User = require("../models/User");
const customError = require("../helpers/customError");
const bcrypt = require("bcryptjs");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    // if (!userFound) return next(customError("user not found!", 401));
    //userFound.avatar = `${req.protocol}://${req.get("host")}${user.avatar}`;

    //now compare hashed password
    const passwordMatched = bcrypt.compareSync(password, userFound.password);

    // Generate a token
    const token = userFound.generateAuthToken();

    // put the token in the response
    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 604800000),
        secure: false, //http
        httpOnly: true,
      })
      .json(userFound);
  } catch (error) {
    next(customError("login failed!", 401));
  }
};
