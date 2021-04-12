const User = require('../models/User');

exports.auth = async (req, res, next) => {
  try {
    // Grab the cookie/token from the request
    console.log("token", req.cookies);
    const token = req.cookies.token;
    // Validate the cookie and look for the user with that _id
    const user = await User.findByToken(token);

    // if the token is corrupted, then throw an error
    if (!user) throw new Error(`Token is corrupted`);

    // if the token is valid
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};