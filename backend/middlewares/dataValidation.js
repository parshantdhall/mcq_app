const Joi = require('@hapi/joi');

// Validating the Question data coming from req body
module.exports.questionValidation = (req, res, next) => {
  const schema = {
    questionText: Joi.string()
      .min(3)
      .required(),
    options: Joi.array()
      .min(2)
      .required(),
    rightOption: Joi.string().required(),
    isChecked: Joi.boolean()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json(error.details[0].message);
  } else {
    next();
  }
};
