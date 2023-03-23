import axios from "axios";
import { useSession } from "next-auth/react";
import Header from "./Header";
import Lantern from "./Lantern";

const { createContext, useState, useEffect } = require("react");
export const DataContext = createContext(null);

const MyContext = ({ children }) => {
  const [data, setData] = useState();
  const [who, setWho] = useState();
  const { data: session } = useSession();

  async function dataFun(type, obj) {
    let trans;
    if (type == "get") {
      await axios.get("/api").then((res) => (trans = res.data));
    } else if (type == "post") {
      console.log(obj);
      //   trans = await axios.post("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api", obj);
      trans = await axios.post("http://localhost:3000/api", obj);
    }
    setData(trans);
  }

  useEffect(() => {
    dataFun("get");
  }, []);
  useEffect(() => {
    if (session !== undefined) {
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
  }, [session]);

  //   useEffect(() => {}, [session]);

  return (
    <DataContext.Provider value={{ data, dataFun, who }}>
      <Header />
      <Lantern />
      {children}
    </DataContext.Provider>
  );
};

export default MyContext;
