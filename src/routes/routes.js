const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const loginAct= require('../controllers/loginController')
const checkReq = require('../controllers/authController')
const generalAccions = require('../controllers/gralController')

router.use(bodyParser.json())


// router.use((req, res, next) => {
//   let horaEjecucion = new Date().toLocaleString(); 
//   console.log('-----------------------------------------------------------------------');
//   console.log(`DEV => Tipo: ${req.method} Ruta: ${req.url} IP: ${req.ip} Hora: ${horaEjecucion}`);
//   console.log('Parameters body:',req.body);
//   console.log('Parameters params:',req.params);
//   // console.log('Parameters headers:',req.headers);
//   console.log('-----------------------------------------------------------------------');
//   next();
// });

// router.use((req, res, next) => {
//   const originalJson = res.json;
//   res.json = function (body) {
//       console.log('Respuesta enviada:', body);
//       return originalJson.call(this, body);
//   };
//   next();
// });



router.get('/', (req, res) => {
  res.send('Welcome to the server');
});

router.post('/login',checkReq.login, loginAct.validateLogin );
router.put('/updateUser', checkReq.validateIP, loginAct.updateUser );
router.put('/resetlogin', checkReq.validateIP, checkReq.login, loginAct.reset );




router.post('/getMenu', checkReq.menu, generalAccions.getMenu );

router.get('/getPhoneExtensions', generalAccions.getPhoneExt );
router.delete('/deletePhoneExtensions', generalAccions.deletePhoneExt );
router.post('/addPhoneExt', generalAccions.addPhoneExt );

module.exports = router;
