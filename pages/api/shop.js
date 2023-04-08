import { executeQuery } from "./db";

async function handler(req, res) {
  const { method, body, query } = req;


  // 상점 물건을 로드
  async function getData() {
    try {
      const shopData = await executeQuery("select * from TBL_SHOP where type = ?", query.type);
      res.json(shopData);
    } catch (err) {
      res.send(err);
    }
  }
  // 구입 시 소지품 추가 및 조개 갯수 감소
  async function putData() {
    try {
      const purchaseItem = await executeQuery(`update TBL_MINE set SHELL=${body.shell}, PEN='${body.pen}', PAINT='${body.paint}' where ID=${body.id}`);
      res.send({ message: "success" });
    } catch (err) {
      res.send(err);
    }
  }

  switch (method) {
    case "GET":
      getData();
      break;
    case "POST":
      break;
    case "PUT":
      putData();
      break;
    case "DELETE":
      break;
    default:
      return;
  }
}
export default handler;
