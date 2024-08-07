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

const validateIP = (req, res, next) => {
  const allowedIPs = ['::ffff:172.20.2.57'];
  const clientIP = req.ip;

  console.log('IP del cliente:', clientIP);

  if (allowedIPs.includes(clientIP)) {
    console.log('IP Permitida');
    next();
  } else {
    console.log('IP No permitida');
    res.status(403).send('Acceso denegado: IP no permitida');
  }
};


const checkReq ={
  login,menu,validateIP
}
module.exports = checkReq;
