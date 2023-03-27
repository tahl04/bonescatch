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
    res.json({...USER, ...POST, COMMENT:data})
  }


  const updateProduct = async () => {
    
    let post = qs.parse(body);
    // let {STATE} = body;
      let data = await executeQuery('UPDATE TBL_POST SET STATE=? WHERE ID=?', [post.STATE]);
      res.json({...USER, ...COMMENT,POST:data});
  };

  


  switch (method) {
    case "POST":
      commentPost();
      break;
    case "GET":
        // commentPost();
    //     // seletData();
      break;
    case "PUT": 
      updateProduct();
      break;
  }

}

export default handler;