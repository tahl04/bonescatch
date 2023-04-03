import { executeQuery } from "./db";
let qs = require('querystring');


async function handler(req, res) {

  const { method, body, query } = req;

  const commentPost = async () => {
    
    let {USER, COUNT, COMMENT, POST, CODENAME,TRIBE} = body;
    let data = await executeQuery(
      'insert into TBL_COMMENT (USER,COUNT,COMMENT,POST,CODENAME,TRIBE) value (?,?,?,?,?,?)',
      [USER,COUNT,COMMENT,POST,CODENAME,TRIBE]
    );
    // res.json({...USER, ...POST, COMMENT:data})
    // res.json({...USER, ...POST, ...REPORT, COMMENT:data})
  }

  const updateProduct = async () => {
    let {ID, STATE, RIGHTUSER} = body;
    executeQuery(`UPDATE TBL_POST SET RIGHTUSER='${RIGHTUSER}', STATE='${STATE}' WHERE ID=${ID}`);
      
  };


  


  switch (method) {
    case "POST":
      commentPost();
      break;
    case "PUT": 
      updateProduct();
      break;
    case "GET":
      break;
  }

}

export default handler;