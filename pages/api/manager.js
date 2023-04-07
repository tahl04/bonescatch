import { executeQuery } from "./db";
let fs = require("fs");


async function handler(req, res) {

    const { method, body, query } = req;
  

    //MAIN.js 에서 포스팅 신고시 추가되는 POST함수
    const managerPost = async () => {
      
      let {REPORT_USER,REPORT_DETAIL,REPORT_POST,REPORT_CODENAME} = body;
      await executeQuery(
        'insert into TBL_MANAGER (REPORT_USER,REPORT_DETAIL,REPORT_POST,REPORT_CODENAME) value (?,?,?,?)',
        [REPORT_USER,REPORT_DETAIL,REPORT_POST,REPORT_CODENAME]
      );
    }


    //MANAGER.js 에서 관리하는 신고목록 삭제 ( 해당 신고 게시물 자체를 삭제하는건 api/index에 포함되어있다. )
    const managerDel = async () => {
      await executeQuery(
        `DELETE FROM TBL_MANAGER WHERE ID=${query.id}`
      );
    }


switch (method) {
    case "POST":
      managerPost();
      break;
    case "DELETE":
      managerDel();
      break;
}

}

export default handler;