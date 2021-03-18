const User = require("../models/User")

exports.login = async (req, res) => {
    const user = await User.findOne({ email:req.body.email }); // we get the whole user here
    if(!user) return res.status(400).send({ error: "user doesn't exist!" })

    if(user.password != req.body.password) return res.status(400).send({ erro:"password is not valid" })
    console.log("user exist and password is matching");
 
    res.send(user);
};