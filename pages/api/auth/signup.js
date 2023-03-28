import { executeQuery } from "../db";

async function handler(req, res) {
  const { body, method, query } = req;

  async function postData() {
    try {
      let result = { nick: "", id: "" };
      const nickCheck = await executeQuery("select * from TBL_USER where CODENAME = ?", body.data.CODENAME);
      const idCheck = await executeQuery("select * from TBL_USER where NAME = ?", body.data.USER.toString());

      if (nickCheck.length) {
        result.nick = "중복 닉네임이 있습니다.";
      } else {
        result.nick = "";
      }
      if (idCheck.length) {
        result.id = "중복 아이디가 있습니다.";
      } else {
        result.id = "";
      }

      if (nickCheck.length || idCheck.length) {
        res.send({ message: "error", data: result });
      } else {
        //회원가입처리
        try {
          const createUser = await executeQuery("insert into TBL_USER (CODENAME, TRIBE, PASS, NAME) value (?,?,?,?)", [
            body.data.CODENAME,
            body.data.TRIBE,
            body.data.PASS,
            body.data.USER,
          ]);

          if (createUser) {
            const userItem = await executeQuery("insert into TBL_MINE (ID,PEN,PAINT,SHELL) value (?,?,?,?)", [createUser.insertId, "", "", -1]);
            console.log(userItem);
          }

          res.send({ message: "CreateUser" });
        } catch (err) {
          res.send(err);
        }
      }
    } catch (err) {
      res.send(err);
    }
  }

  switch (method) {
    case "GET":
      getData();
      break;
    case "POST":
      postData();
      break;
    case "PUT":
      break;
    default:
      return;
  }
}

export default handler;
