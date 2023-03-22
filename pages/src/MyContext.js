import axios from "axios";
import Header from "./Header";
import Lantern from "./Lantern";

const { createContext, useState, useEffect } = require("react");
export const DataContext = createContext(null);





const MyContext = ({ children }) => {
    const [data, setData] = useState();
    const [aa,AA] = useState(false);

    async function dataFun(type, obj) {

        let trans;
        if (type == 'get') {
            await axios.get('/api').then(res => trans = res.data)
        } else if (type == 'post') {
            console.log(obj);
            // trans = await axios.post('https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api', obj)
            trans = await axios.post('http://localhost:3000/api', obj)
        } else if (type == 'put') {
            // trans = await axios.put(`/api/${obj.id}`, obj)
        } else {
            // trans = await axios.delete(`/api/${obj.id}`)
        }
        // setData(trans)
        setData(trans)
    }
    

    
useEffect(() => {
    dataFun('get');
}, []);


    return (
        <DataContext.Provider value={{ data, dataFun }} >
            <Header/>
            <Lantern/>
            {children}
        </DataContext.Provider>
    )
}




export default MyContext
