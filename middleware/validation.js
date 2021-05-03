const Joi = require("joi");

const validateSchema = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    nickName: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  console.log("schema=", schema);

  const { error, value } = schema.validate(data);
  console.log("validationError", error);
  console.log("validatevalue", value);
  if (error) next(error);
  next();
};

module.exports.validateSchema = validateSchema;
