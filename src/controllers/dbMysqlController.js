const dbMysql = require("../config/mysqlConfig");
const encodeBase64Node = (input) =>
  Buffer.from(input, "utf8").toString("base64");
const decodeBase64Node = (input) =>
  Buffer.from(input, "base64").toString("utf8");

const myslqAccions = {
  testConn: async () => {
    try {
      await dbMysql.execute("SELECT 1");
      return true;
    } catch (error) {
      throw new Error("Database connection error: " + error.message);
    }
  },
  insertMessage: async (data) => {
    try {
      const [result] = await dbMysql.execute(
        `INSERT INTO TBL_MSG (ID_USER,MSG) VALUES (${data.user},'${data.msg}')`
      );
      return result.affectedRows;
    } catch (error) {
      throw new Error("Database error: " + error.message);
    }
  },
  getMessage: async () => {
    try {
      const [rows] = await dbMysql.execute(`   
        SELECT tu.NAME_USER,m.MSG,m.DATE_MSG 
        from TBL_MSG m
        left join TBL_USER tu on m.ID_USER = tu.ID_USER
        where DATE(m.DATE_MSG) = CURDATE()
        `);
      return rows;
    } catch (error) {
      throw new Error("Database error: " + error.message);
    }
  },
  validateLogin: async (name, pass) => {
    let user = name.toUpperCase();

    try {
      const [rows] = await dbMysql.execute(`
        SELECT * 
        FROM TBL_USER 
        WHERE PASS_USER='${pass}' AND  UPPER(NAME_USER)='${user}' OR NOMINA = '${user}'  AND STATUS_USER=1
      `);
      return rows;
    } catch (error) {
      console.log(error);
    }
  },
  resetLogin: async (name, pass) => {
    try {
      const [result] = await dbMysql.execute(
        `UPDATE TBL_USER SET PASS_USER='${pass}' WHERE NOMINA='${name}' `
      );
      return result.affectedRows;
    } catch (error) {
      console.log(error);
    }
  },
  getMenu: async (id_user, id_perfil) => {
    let query
    switch (id_perfil) {
      case 0:
        query = 'SELECT * FROM TBL_MENU where STATUS_MENU = 1 order by ID_MENU ASC '
        break;
      default:
        query = ` 
        SELECT M.*,TTM.NAME_TIPO FROM TBL_MENU M 
        LEFT JOIN TBL_MENU_ACCESS MA ON M.ID_MENU = MA.ID_MENU
        LEFT JOIN TBL_TIPO_MENU TTM ON M.ID_TIPO_MENU = TTM.ID_TIPO_MENU
        WHERE MA.ID_PERFIL IN (0, ${id_perfil} )  AND MA.STATUS_ACCESS = 1 AND M.STATUS_MENU = 1 AND TTM.STATUS_TIPO = 1
        order by M.ID_MENU ASC `
        break;
    }
    
    try {
      const [rows] = await dbMysql.execute(query);
      return rows;
    } catch (error) {
      console.log(error);
    }
  },
  getExt: async () => {
    try {
      const [rows] = await dbMysql.execute(
        `SELECT * FROM TBL_PHONE_EXT WHERE STATUS_EXT=1 `
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  },
  addExt: async (owner, area, ext) => {
    try {
      const [result] = await dbMysql.execute(
        `INSERT INTO TBL_PHONE_EXT (OWNER_EXT, AREA_EXT, NAME_EXT, STATUS_EXT) VALUES ('${owner}','${area}','${ext}',1 )`
      );
      return result.affectedRows;
    } catch (error) {
      console.log(error);
    }
  },
  deleteExt: async (idExt) => {
    try {
      const [result] = await dbMysql.execute(
        `DELETE FROM TBL_PHONE_EXT WHERE ID_EXT= ${idExt}`
      );
      return result.affectedRows;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = myslqAccions;
