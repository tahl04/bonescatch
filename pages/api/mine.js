import { executeQuery } from "./db";

async function handler(req, res) {
  const { method, body, query } = req;


  // 유저의 소지품 내역을 나타냄
  async function getItem() {
    try {
      const myPen = await executeQuery("select PEN from TBL_MINE where id=?", query.id);
      const myPaint = await executeQuery("select PAINT from TBL_MINE where id=?", query.id);

      res.json({ pen: myPen, paint: myPaint });
    } catch (err) {
      res.send(err);
    }
  }

  switch (method) {
    case "GET":
      getItem();
      break;
    default:
      return;
  }
}

export default handler;
