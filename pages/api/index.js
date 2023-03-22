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
    let { ID, NAME, CODENAME, PASS, TRIBE } = body;

    let data = await executeQuery(
      'insert into TBL_USER (ID,NAME,CODENAME,PASS,TRIBE) value (?,?,?,?,?)',
      [ID,NAME,CODENAME,PASS,TRIBE]
    );
    
    let {USER,DRAW,STATE,TITLE} = body;
    let datas = await executeQuery(
      'insert into TBL_POST (ID,USER,DRAW,STATE,TITLE) value (?,?,?,?,?)',
      [ID,USER,DRAW,STATE,TITLE]
    );
    let {DATE,COUNT,COMMENT} = body;
    let datass = await executeQuery(
      'insert into TBL_COMMENT (ID,USER,DATE,COUNT,COMMENT) value (?,?,?,?,?)',
      [ID,USER,DATE,COUNT,COMMENT]
    );
    res.json({USER:data,POST:datas,COMMENT:datass})
  }

  switch (method) {
    case "GET":
      seletData();
      break;
    case "POST":
      insertData();
      break;
    // case "POST": insertDataUser(); break;
  }
};

export default handler;
