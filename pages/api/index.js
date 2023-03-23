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

  switch (method) {
    case "GET":
      seletData();
      break;
    case "POST":
      break;
    default:
      return;
  }
};

export default handler;
