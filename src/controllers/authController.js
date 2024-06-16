const Joi = require("joi");

const templateLogin = Joi.object({
  name: Joi.string().required(),
  pass: Joi.string().required(),
});

const templateMenu = Joi.object({
  id_user: Joi.number().required(),
  id_perfil: Joi.number().required(),
});

const menu = (req, res, next) => {
  const { error } = templateMenu.validate(req.body);
  if (error) {
    return res.status(400).json({ status: false, details: error.message });
  }
  next();
};
const login = (req, res, next) => {
  const { error } = templateLogin.validate(req.body);
  if (error) {
    return res.status(400).json({ status: false, details: error.message });
  }
  next();
};



const checkReq ={
  login,menu
}
module.exports = checkReq;
