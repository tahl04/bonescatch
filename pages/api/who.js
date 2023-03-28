import { executeQuery } from "./db";

async function handler(req, res) {
  const { method, body, query } = req;

  async function dataGet() {
    try {
      const signUser = await executeQuery("select * from TBL_USER where ID = ?", query.id);
      const userItem = await executeQuery("select shell from TBL_MINE where ID = ?", query.id);

      const result = { ...signUser[0], SHELL: userItem[0].shell };
      res.json(result);
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
