const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    }); // we get the whole user here
    if (!user) return res.status(400).send({ error: "user doesn't exist!" });
    user.avatar = `${req.protocol}://${req.get("host")}${user.avatar}`;
    res.json(user);
  } catch (error) {
    // if(user.password != req.body.password) return res.status(400).send({ error:"password is not valid" })
    // console.log("user exist and password is matching");

    next(error);
  }
};
