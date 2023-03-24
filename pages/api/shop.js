import { executeQuery } from "./db";

async function handler(req, res) {
  const { method, body, query } = req;

  async function getData() {
    try {
      const shopData = await executeQuery("select * from TBL_SHOP where type = ?", query.type);
      console.log(shopData);
      res.json(shopData);
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
      break;
    case "DELETE":
      break;
    default:
      return;
  }
}
export default handler;
