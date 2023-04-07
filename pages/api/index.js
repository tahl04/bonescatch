let fs = require("fs");
import { executeQuery } from "./db";

const handler = async (req, res) => {
  const { method, body, query } = req;

  //사용할 데이터들을 DB에서 가져와 배열에 담는과정
  const seletData = async () => {
    try {

      //다른 유저들의 정보를 다 가져오는것은 보안상 위험이 있기에, 로그인하는 자신의 정보와 타유저들의 ID(고유)갚, 닉네임, 부족정도만 불러온다.
      let data = await executeQuery("select * from TBL_USER order by ID DESC", []);
      let arry = []
      data.map((obj)=>{
        arry.push({ID:obj.ID, CODENAME:obj.CODENAME, TRIBE:obj.TRIBE})
      })


      let datas = await executeQuery("select * from TBL_POST order by ID DESC", []);
      let datass = await executeQuery("select * from TBL_COMMENT order by ID DESC", []);
      let datasss = await executeQuery("select * from TBL_MANAGER order by ID DESC", []);


      //Blob파일이 암호화 되어있는데, 아래 코드로 엄호화에서 이미지 경로로 바꾸는 작업.
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


  // DRAW.js에서 그린 결과물을 POST 하는 함수.
  const insertData = async () => {
    
    let {USER, DRAW, STATE, TITLE, USERCODE,RIGHTUSER} = body;
    await executeQuery(
      'insert into TBL_POST (USER,DRAW,STATE,TITLE,USERCODE,RIGHTUSER) value (?,?,?,?,?,?)',
      [USER,DRAW,STATE,TITLE,USERCODE,RIGHTUSER]
    );
  }


  // 관리자가 신고받은 게시물을 DELETE하는 과정
  // DELETE는 body에 매개변수로 받아올 수 없기 때문에 query갚으로 받아왔다.
  const managerPostDel = async () => {
    await executeQuery(
      `DELETE FROM TBL_POST WHERE ID=${query.id}`
    );
  }



  switch (method) {
    case "GET":
      seletData();
      break;
    case "POST":
      insertData();
      break;
    case "DELETE":
      managerPostDel();
      break;
    default:
      return;
  }
};

export default handler;
