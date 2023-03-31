import { executeQuery } from "./db";

export default function handler(req, res) {
  const { method, body, query } = req;

  console.log(method);

  async function getRank() {
    const rankData = await executeQuery("select STATE, RIGHTUSER from TBL_POST");
    res.json(rankData);
  }

  switch (method) {
    case "GET":
      getRank();
      break;
    default:
      return;
  }
}
