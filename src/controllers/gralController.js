const myslqAccions = require('./dbMysqlController')

const generalAccions = {
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
  },
  getMenu : async (req,res) => {
    const {id_user,id_perfil} = req.body
    try {
      const log= await myslqAccions.getMenu(id_user,id_perfil)
      console.log(log);    
      if(log.length > 0){
        res.status(200).json(log)
      }else {
        res.status(404).json({ rspta: 'NO MENU' })
      }
      
    } catch (error) {
      console.log(error);
    }
  },
  getPhoneExt : async (req,res) => {
    try {
      const log= await myslqAccions.getExt()
      console.log(log);    
      if(log.length > 0){
        res.status(200).json(log)
      }else {
        res.status(404).json({ rspta: 'NO MENU' })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports= generalAccions