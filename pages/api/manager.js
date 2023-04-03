import { executeQuery } from "./db";
let fs = require("fs");


async function handler(req, res) {

    const { method, body, query } = req;
  
    const managerPost = async () => {
      
      let {REPORT_USER,REPORT_DETAIL,REPORT_POST} = body;
      let dataq = await executeQuery(
        'insert into TBL_MANAGER (REPORT_USER,REPORT_DETAIL,REPORT_POST) value (?,?,?)',
        [REPORT_USER,REPORT_DETAIL,REPORT_POST]
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