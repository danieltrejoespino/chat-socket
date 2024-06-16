const myslqAccions = require('./dbMysqlController')

const loginAct = {
  validateLogin : async (req,res) => {
    const {name,pass} = req.body
    try {
      const log= await myslqAccions.validateLogin(name,pass)    
      if(log.length === 1){
        res.status(200).json(log[0])
      }else {
        res.status(404).json({ rspta: 'User or pass incorrect' })
      }
      
    } catch (error) {
      
    }
  }
}

module.exports= loginAct