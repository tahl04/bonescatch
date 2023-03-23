let fs = require("fs");
import { executeQuery } from "./db";

const handler = async (req, res) => {
  const { method, body, query } = req;
  const seletData = async () => {
    try {
      // const nickCheck = await executeQuery(`select * from TBL_USER where CODENAME = ?`, query.nick);

      // if (nickCheck.length) {
      //   console.log("중복");
      // } else {
      //   console.log("가능");
      //   checkNick.current = true;
      // }

      let data = await executeQuery("select * from TBL_USER order by ID DESC", []);
      let datas = await executeQuery("select * from TBL_POST order by ID DESC", []);
      let datass = await executeQuery("select * from TBL_COMMENT order by ID DESC", []);

      datas.map((obj) => {
        let buf = new Buffer(obj.DRAW);
        let base64String = buf.toString("utf-8");
        obj.DRAW = base64String;
        return obj;
      });
      res.json({ USER: data, POST: datas, COMMENT: datass });
    } catch (err) {
      res.send(err);
    }
  };

  const insertData = async () => {
    
    let {ID, USER, DRAW, STATE, TITLE, COUNT, COMMENT, DATE, USERCODE} = body;
    let datas = await executeQuery(
      'insert into TBL_POST (ID,USER,DRAW,STATE,TITLE,USERCODE) value (?,?,?,?,?,?)',
      [ID,USER,DRAW,STATE,TITLE,USERCODE]
    );
    // let datass = await executeQuery(
    //   'insert into TBL_COMMENT (ID,DATE,USER,COUNT,COMMENT) value (?,?,?,?,?)',
    //   [ID,DATE,USER,COUNT,COMMENT]
    // );
    res.json({...USER,...COMMENT, POST:datas})
  }



  switch (method) {
    case "GET":
      seletData();
      break;
    case "POST":
      insertData();
      break;
    default:
      return;
  }
};

export default handler;
