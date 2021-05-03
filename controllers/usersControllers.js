const User = require("../models/User");
const { sendVerificationEmail } = require("../mailer/setup");

exports.getUsers = async (req, res, next) => {
  const users = await User.find().sort({ firstName: 1 });
  res.send(users);
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.avatar = `${req.protocol}://${req.get("host")}${user.avatar}`;
    //                localhost    ://8080             /images/avatar1.jpg
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    userUpdated.avatar = `${req.protocol}://${req.get("host")}${
      userUpdated.avatar
    }`;
    res.json(userUpdated);
  } catch (err) {
    next(err);
  }
};
// signup
exports.addUser = async (req, res, next) => {
  const info = req.body;
  try {
    const user = new User(info);

    // Generate an email verification token
    const verifToken = user.generateEmailVerifToken();
    user.emailVerificationToken = verifToken; //emailVerificationToken it is inside the user schema.we send the verified email token there
    await user.save();

    // Send an email verification email. this is in setup
    sendVerificationEmail(user);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    let userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) throw new Error();
    res.json(userDeleted);
  } catch (err) {
    let error = new Error(`User with ID ${id} does not exist`);
    error.status = 400;
    next(error);
  }
};

exports.authUser = (req, res) => {
  res.json(req.user); // inside the req.user we have token
};

exports.verifyUserAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { emailIsVerified: true },
      { new: true }
    );
    console.log("verified user", user);
    if (!user) {
      res.json({ error: "there is no verified user!" });
    }
    res.json({ message: `Your user (${req.user.email}) has been validated.` });
  } catch (error) {
    next(error);
  }
};

exports.loginUserGoogle = async (req, res, next) => {
  const { email, googleId, firstName, lastName } = req.body; //email, googleId, firstName, lastName
  try {
    let user = await User.findOne({
      email,
    });

    console.log("USER FOUND", user);

    if (!user) {
      // I am searching the user with it's email which is coming from req.body 1-  { email },
      // If I find then what I want to update of that user 2- { googleId, email, firstName, lastName },
      // now I am trying to log in with my google accout but it is not inside the database
      // because I didn't signd up with this account. That's why we are useing findOneAndUpdate.
      //  it will create the new user and that is google user coming from req.body and will set the user.
      user = await User.findOneAndUpdate(
        { email },
        { googleId, email, firstName, lastName },
        { new: true, upsert: true }
      );

      console.log("USER CREATED", user);

      if (!user)
        return next(
          customError(
            `Not found this user with email ${email}, my friend. Try again...`,
            401
          )
        );
    }

    // After user creation we follow the normal path
    // Generate a token
    const token = user.generateAuthToken();
    console.log("TOKEN", token);

    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 604800000),
        sameSite: process.env.NODE_ENV == "production" ? "None" : "lax",
        secure: process.env.NODE_ENV == "production" ? true : false, //http on localhost, https on production
        httpOnly: true,
      })
      .json(user);
  } catch (error) {
    next(error);
  }
};
