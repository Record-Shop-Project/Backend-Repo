const User = require("../models/User");
const jwt = require("jsonwebtoken");
const customError = require("../helpers/customError");
const ourSuperSecretKey = process.env.SECRET_KEY;

exports.auth = async (req, res, next) => {
  try {
    // Grab the cookie/token from the request
    const token = req.cookies.token;
    console.log("token=>", token);

    // Validate the cookie and look for the user with that _id
    const verifyUser = jwt.verify(token, ourSuperSecretKey);
    console.log("veri=>", verifyUser);

    // if the token is corrupted, then throw an error
    if (!verifyUser) next(customError("User was not found"));

    // if the token is valid
    req.user = verifyUser;
    console.log("req.user=>", req.user);
    next();
  } catch (error) {
    next(customError("can not verify!", 401));
  }
};
