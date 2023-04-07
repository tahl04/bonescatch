import { executeQuery } from "./db";
let qs = require('querystring');


async function handler(req, res) {

  const { method, body, query } = req;


  // ADD 댓글
  const commentPost = async () => {
    
    let {USER, COUNT, COMMENT, POST, CODENAME,TRIBE} = body;
    await executeQuery(
      'insert into TBL_COMMENT (USER,COUNT,COMMENT,POST,CODENAME,TRIBE) value (?,?,?,?,?,?)',
      [USER,COUNT,COMMENT,POST,CODENAME,TRIBE]
    );
  }

  //정답을 맞출 시 TBL_POST STATE 변경.
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