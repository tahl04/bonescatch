let fs = require('fs');
import { executeQuery } from './db';

const handler = async (req, res) => {
  // DESC(내림차순), ASC(오름차순)
  const { method, body } = req;


  
  // const seletDataUser = async () => {
  //   try {
  //     let data = await executeQuery('select * from TBL_USER order by ID DESC', []);
      

  //     res.json(data)
  //   } catch (err) {
  //   }
  // }
  const seletData = async () => {
    try {
      let data = await executeQuery('select * from TBL_USER order by ID DESC', []);
      let datas = await executeQuery('select * from TBL_POST order by ID DESC', []);
      res.json({USER:data,POST:datas})
    } catch (err) {
    }
  }

  // const insertDataUser = async () => {
  //   let {ID,NAME,CODENAME,PASS} = body;

  //   let data = await executeQuery(
  //     'insert into TBL_USER (ID,NAME,CODENAME,PASS) value (?,?,?,?)',
  //     [ID,NAME,CODENAME,PASS]
  //   );
  //   res.json(data)
  // }

  
  const insertData = async () => {
    let {ID,NAME,CODENAME,PASS} = body;

    let data = await executeQuery(
      'insert into TBL_USER (ID,NAME,CODENAME,PASS) value (?,?,?,?)',
      [ID,NAME,CODENAME,PASS]
    );
    
    let {USER,DRAW,STATE,TITLE} = body;
    let datas = await executeQuery(
      'insert into TBL_POST (ID,USER,DRAW,STATE,TITLE) value (?,?,?,?,?)',
      [ID,USER,DRAW,STATE,TITLE]
    );
    res.json({USER:data,POST:datas})
  }

  switch (method) {
    case "GET": seletData(); break;
    case "POST": insertData(); break;
    // case "POST": insertDataUser(); break;
  }
}

export default handler;

