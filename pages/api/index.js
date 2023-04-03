let fs = require("fs");
import { executeQuery } from "./db";

const handler = async (req, res) => {
  const { method, body, query } = req;
  const seletData = async () => {
    try {

      let data = await executeQuery("select * from TBL_USER order by ID DESC", []);
      let arry = []
      data.map((obj)=>{
        arry.push({ID:obj.ID, CODENAME:obj.CODENAME, TRIBE:obj.TRIBE})
      })

      // console.log(arry)

      let datas = await executeQuery("select * from TBL_POST order by ID DESC", []);
      let datass = await executeQuery("select * from TBL_COMMENT order by ID DESC", []);
      let datasss = await executeQuery("select * from TBL_MANAGER order by ID DESC", []);

      datas.map((obj) => {
        let buf = new Buffer(obj.DRAW);
        let base64String = buf.toString("utf-8");
        obj.DRAW = base64String;
        return obj;
      });
      res.json({ USER: arry, POST: datas, COMMENT: datass, MANAGER: datasss});
    } catch (err) {
      res.send(err);
    }
  };

  const insertData = async () => {
    
    let {USER, DRAW, STATE, TITLE, COMMENT, USERCODE,RIGHTUSER} = body;
    let datas = await executeQuery(
      'insert into TBL_POST (USER,DRAW,STATE,TITLE,USERCODE,RIGHTUSER) value (?,?,?,?,?,?)',
      [USER,DRAW,STATE,TITLE,USERCODE,RIGHTUSER]
    );
    // let datass = await executeQuery(
    //   'insert into TBL_COMMENT (ID,DATE,USER,COUNT,COMMENT) value (?,?,?,?,?)',
    //   [ID,DATE,USER,COUNT,COMMENT]
    // );
    // console.log(body);

    // res.json({...USER,...COMMENT, ...REPORT, POST:datas})
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
