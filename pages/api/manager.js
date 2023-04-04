import { executeQuery } from "./db";
let fs = require("fs");


async function handler(req, res) {

    const { method, body, query } = req;
  
    const managerPost = async () => {
      
      let {REPORT_USER,REPORT_DETAIL,REPORT_POST,REPORT_CODENAME} = body;
      await executeQuery(
        'insert into TBL_MANAGER (REPORT_USER,REPORT_DETAIL,REPORT_POST,REPORT_CODENAME) value (?,?,?,?)',
        [REPORT_USER,REPORT_DETAIL,REPORT_POST,REPORT_CODENAME]
      );
}


switch (method) {
    case "POST":
        managerPost();
        break;
    case "GET":
        break;
}

}

export default handler;