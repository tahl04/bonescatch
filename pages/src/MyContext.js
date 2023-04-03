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

  async function dataShell(type, obj) {
    let transe;
    if (type == "put") {
      transe = await axios.put("/api/shell", obj);
    }
    setData(transe);
  }

  async function dataPost(type, obj) {
    let transw;
    if (type == "get") {
      await axios.get("/api").then((res) => (transw = res.data));
    } else if (type == "post") {
      transw = await axios.post("/api/comment", obj);
    } else if (type == "put") {
      transw = await axios.put("/api/comment", obj);
    }
    setData(transw);
  }

  async function dataFun(type, obj) {
    let trans;
    if (type == "get") {
      await axios.get("/api").then((res) => (trans = res.data));
    } else if (type == "post") {
      // console.log(obj);
      //   trans = await axios.post("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api", obj);
      trans = await axios.post("/api", obj);
    }
    setData(trans);
  }

  useEffect(() => {
    dataFun("get");
    dataPost("get");
  }, []);

  function sessionWho() {
    console.log("정보갱신");
    if (session !== undefined && session !== null) {
      axios
        .get("/api/who", {
          params: {
            id: session.user[0].ID,
          },
        })
        .then((res) => {
          setWho(res.data);
        });
    }
  }
  function sessionMine() {
    if (session != undefined && session !== null) {
      axios
        .get("/api/mine", {
          params: {
            id: session.user[0].ID,
          },
        })
        .then((res) => {
          setMine({ pen: res.data.pen[0].PEN, paint: res.data.paint[0].PAINT });
        });
    }
  }

  useEffect(() => {
    sessionWho();
    sessionMine();
  }, [session]);

  useEffect(() => {}, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status]);

  return (
    <DataContext.Provider value={{ data, dataFun, who, pageChange, setClose, dataPost, dataShell, sessionWho, sessionMine, mine }}>
      <Header />
      <Lantern />
      {children}
    </DataContext.Provider>
  );
};

export default MyContext;
