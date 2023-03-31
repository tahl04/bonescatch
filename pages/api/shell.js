import { executeQuery } from "./db";


async function handler(req, res) {

  const { method, body, query } = req;

  const updateShell = async () => {
    let {ID, SHELL} = body;
    executeQuery(`UPDATE TBL_MINE SET SHELL='${SHELL}' WHERE ID=${ID}`);
      
  };


  


  switch (method) {
    // case "POST":
    //   commentPost();
    //   break;
    case "PUT": 
      updateShell();
      break;
    case "GET":
      break;
  }

}

export default handler;