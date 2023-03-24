import { executeQuery } from "./db";

async function handler(req, res) {

  const { method, body, query } = req;

  const commentPost = async () => {
    
    let {USER, COUNT, COMMENT, POST} = body;
    let data = await executeQuery(
      'insert into TBL_COMMENT (USER,COUNT,COMMENT,POST) value (?,?,?,?)',
      [USER,COUNT,COMMENT,POST]
    );
    res.json({...USER, ...POST, COMMENT:data})
  }




switch (method) {
    case "POST":
        commentPost();
        break;
    case "GET":
        // commentPost();
    //     // seletData();
        break;
    default:
        return;
  }
}

export default handler;