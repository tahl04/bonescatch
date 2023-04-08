import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "./Header";
import Lantern from "./Lantern";

const { createContext, useState, useEffect } = require("react");
export const DataContext = createContext(null);

const MyContext = ({ children }) => {
  const [pageChange, setClose] = useState(false);
  const [data, setData] = useState();
  const [who, setWho] = useState();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mine, setMine] = useState();


  // 조개 변경 axios
  async function dataShell(type, obj) {
    let transe;
    if (type == "put") {
      transe = await axios.put("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/shell", obj);
    }
    setData(transe);
  }

  // 댓글 추가 axios 및 POST STATE 변경
  async function dataPost(type, obj) {
    let transw;
    if (type == "get") {
      await axios.get("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api").then((res) => (transw = res.data));
    } else if (type == "post") {
      transw = await axios.post("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/comment", obj);
    } else if (type == "put") {
      transw = await axios.put("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/comment", obj);
    }
    setData(transw);
  }

  // 신고 axios
  async function reportPutData(type, obj) {
    let transq;
    if (type == "get") {
      await axios.get("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api").then((res) => (transq = res.data));
    } else if (type == "post") {
      transq = await axios.post("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/manager", obj);
    } else if (type == "delete"){
      transq = await axios.delete("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/manager", {
        params:{
          id: obj
        }
      });
    }
    setData(transq);
  }

  // 그림 업로드
  async function dataFun(type, obj) {
    let trans;
    if (type == "get") {
      await axios.get("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api").then((res) => (trans = res.data));
    } else if (type == "post") {
      trans = await axios.post("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api", obj);
    }else if (type == "delete"){
      trans = await axios.delete("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api", {
        params:{
          id: obj
        }
      });
    }
    setData(trans);
  }


  //초기 시작 시 데이터를 한번 불러온다
  useEffect(() => {
    dataFun("get");
    dataPost("get");
  }, []);


  // 로그인 정보 (who변수)
  function sessionWho() {
    if (session !== undefined && session !== null) {
      axios
        .get("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/who", {
          params: {
            id: session.user[0].ID,
          },
        })
        .then((res) => {
          setWho(res.data);
        });
    }
  }


  // 소지품 정보 (mine변수)
  function sessionMine() {
    if (session != undefined && session !== null) {
      axios
        .get("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/mine", {
          params: {
            id: session.user[0].ID,
          },
        })
        .then((res) => {
          setMine({ pen: res.data.pen[0].PEN, paint: res.data.paint[0].PAINT });
        });
    }
  }

  // 로그인 시 정보를 불러온다.
  useEffect(() => {
    sessionWho();
    sessionMine();
  }, [session]);


  // 미로그인시 로그인 화면으로 이동
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status]);

  return (
    <DataContext.Provider value={{ data, dataFun, who, pageChange, setClose, dataPost, dataShell, sessionWho, sessionMine, mine, reportPutData}}>
      <Header />
      <Lantern />
      {children}
    </DataContext.Provider>
  );
};

export default MyContext;
