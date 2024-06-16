const Joi = require("joi");

const templateLogin = Joi.object({
  name: Joi.string().required(),
  pass: Joi.string().required(),
});


const login = (req, res, next) => {
  const { error } = templateLogin.validate(req.body);
  if (error) {
    return res.status(400).json({ status: false, details: error.message });
  }
  next();
};



const checkReq ={
  login
}
module.exports = checkReq;
