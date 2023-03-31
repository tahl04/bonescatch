import { executeQuery } from "./db";

export default function handler(req, res) {
  const { method, body, query } = req;

  console.log(method);

  async function getRank() {
    const rankData = await executeQuery("select STATE, RIGHTUSER from TBL_POST where STATE NOT IN('미점령')");
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
