const dbMysql = require('../config/mysqlConfig')

const myslqAccions = {
  testConn: async () => {
    try {
      await dbMysql.execute('SELECT 1');
      return true;
    } catch (error) {
      throw new Error('Database connection error: ' + error.message);
    }
  },
  insertMessage: async (data) => {
    try {
      const [result] = await dbMysql.execute(`INSERT INTO tbl_msg_general (idUserChat,msg) VALUES (${data.user},'${data.msg}')`)
      return result.affectedRows;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },
  validateLogin: async (name,pass) => {
    try {
      const [rows] = await dbMysql.execute(`SELECT * FROM tbl_user WHERE nameUser='${name}' AND passUser='${pass}'`)
      return rows

    } catch (error) {
      console.log(error);
    }
  }


}

module.exports = myslqAccions

