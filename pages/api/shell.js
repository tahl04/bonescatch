import { executeQuery } from "./db";



// 소지품에서 조개 갯수를 바꾸는데 사용 (튜토리얼, 물건 구입, 문제 정답 시)
async function handler(req, res) {

  const { method, body, query } = req;

  const updateShell = async () => {
    let {ID, SHELL} = body;
    executeQuery(`UPDATE TBL_MINE SET SHELL='${SHELL}' WHERE ID=${ID}`);
      
  };


  switch (method) {
    case "PUT": 
      updateShell();
      break;
    case "GET":
      break;
  }

}

export default handler;