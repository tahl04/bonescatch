import { executeQuery } from "./db";

async function handler(req, res) {
  const { method, body, query } = req;

  async function dataGet() {
    try {
      const signUser = await executeQuery("select * from TBL_USER where ID = ?", query.id);
      res.json(signUser);
    } catch (err) {
      res.send(err);
    }
  }

  switch (method) {
    case "GET":
      dataGet();
      break;
    default:
      return;
  }
}

export default handler;
