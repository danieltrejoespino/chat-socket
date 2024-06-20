const dbMysql = require('../config/mysqlConfig')
const encodeBase64Node = (input) => Buffer.from(input, 'utf8').toString('base64');
const decodeBase64Node = (input) => Buffer.from(input, 'base64').toString('utf8');



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
      const [result] = await dbMysql.execute(`INSERT INTO TBL_MSG (ID_USER,MSG) VALUES (${data.user},'${data.msg}')`)
      return result.affectedRows;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },
  getMessage: async () => {
    try {
      const [rows]  = await dbMysql.execute(`   
        SELECT tu.NAME_USER,m.MSG,m.DATE_MSG 
        from imp_internal.TBL_MSG m
        left join imp_internal.TBL_USER tu on m.ID_USER = tu.ID_USER
        where DATE(m.DATE_MSG) = CURDATE()
        `)
      return rows
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },  
  validateLogin: async (name,pass) => {
    try {
      const [rows] = await dbMysql.execute(`SELECT * FROM TBL_USER WHERE NAME_USER='${name}' AND PASS_USER='${pass}' AND STATUS_USER=1`)
      return rows

    } catch (error) {
      console.log(error);
    }
  },
  getMenu: async (id_user,id_perfil) => {
    try {
      const [rows] = await dbMysql.execute(`SELECT * FROM TBL_MENU`)
      return rows

    } catch (error) {
      console.log(error);
    }
  },
  getExt: async () => {
    try {
      const [rows] = await dbMysql.execute(`SELECT * FROM TBL_PHONE_EXT WHERE STATUS_EXT=1 `)
      return rows

    } catch (error) {
      console.log(error);
    }
  },
  addExt: async (owner, area, ext) => {
    try {
      const [result] = await dbMysql.execute(`INSERT INTO TBL_PHONE_EXT (OWNER_EXT, AREA_EXT, NAME_EXT, STATUS_EXT) VALUES ('${owner}','${area}','${ext}',1 )`)
      return result.affectedRows;

    } catch (error) {
      console.log(error);
    }
  }


}

module.exports = myslqAccions

