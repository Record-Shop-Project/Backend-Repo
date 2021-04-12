const User = require('../models/User');
const bcryptjs = require('bcryptjs');

exports.getUsers = async (req, res, next) => {
  let users = await User.find().sort('firstName');
  res.send(users);
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
     user.avatar = `${req.protocol}://${req.get('host')}${user.avatar}`;
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(id, req.body, { new: true });
    user.avatar = `${req.protocol}://${req.get('host')}${user.avatar}`;
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  const info = req.body;
  try {
    const user = await User.create(info);
    user.avatar = `${req.protocol}://${req.get('host')}${user.avatar}`;
    res.json(user);
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
    let error = new Error(`Todo with ID ${id} does not exist`);
    error.status = 400;
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

     if (!user) throw new Error(`Please check your credentials`);
     user.avatar = `${req.protocol}://${req.get('host')}${user.avatar}`;

    const pwCompareResult = bcryptjs.compareSync(password, user.password);

    if (!pwCompareResult) {
      return next(customError('Wrong password', 401));
    }

    // Generate a token
    const token = user.generateAuthToken();

    // put the token in the response
    res
      .cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        // sameSite: process.env.NODE_ENV == 'production' ? 'None' : 'lax',
        // secure: process.env.NODE_ENV == 'production' ? true : false, //http on localhost, https on production
         httpOnly: true,
      })
      .json(user);

  
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.authUser = (req, res) => {
  //req.user
  res.json(req.user);
};