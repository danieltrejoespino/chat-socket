const myslqAccions = require('./dbMysqlController')
const jwt = require('jsonwebtoken');
 
const secretKey = 'your-secret-key';


const loginAct = {
  validateLogin : async (req,res) => {
    const {name,pass} = req.body
    try {
      const log= await myslqAccions.validateLogin(name,pass)    
      if(!log.length){
        res.status(404).json({ rspta: 'User or pass incorrect' })
      }
      
      const token = jwt.sign({ id: log[0].ID_USER ,name : log[0].NAME_USER  }, secretKey, {
        expiresIn: 86400 // 24 hours
      });
      
      const rspta =   {
        ID_USER:  log[0].ID_USER,
        ID_PERFIL:  log[0].ID_PERFIL,
        NAME_USER: log[0].NAME_USER,        
        STATUS_USER: log[0].STATUS_USER,
        TOKEN: token,
      }
      console.log(rspta);

      res.status(200).send(rspta)
      // res.status(200).json(log[0])
    } catch (error) {
      
    }
  }

}

module.exports= loginAct