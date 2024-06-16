const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const loginAct= require('../controllers/loginController')
const checkReq = require('../controllers/authController')

router.use(bodyParser.json())


router.get('/', (req, res) => {
  res.send('Welcome to the server');
});

router.post('/login', checkReq.login, loginAct.validateLogin );

router.post('/menu', checkReq.menu, loginAct.getMenu );

module.exports = router;
