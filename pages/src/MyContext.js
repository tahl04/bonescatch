import axios from "axios";
import Header from "./Header";

const { createContext, useState } = require("react");
export const DataContext = createContext(null);

const MyContext = ({ children }) => {
    const [data, setData] = useState();

    async function dataFun(type, obj) {

        let trans;
        if (type == 'get') {
            await axios.get('/api').then(res => trans = res.data)
        } else if (type == 'post') {
            // console.log(obj)
            trans = await axios.post('http://localhost:3000/api', obj)
        } else if (type == 'put') {
            // trans = await axios.put(`/api/${obj.id}`, obj)
        } else {
            // trans = await axios.delete(`/api/${obj.id}`)
        }
        // setData(trans)
        setData(trans)
    }


    return (
        <DataContext.Provider value={{ data, dataFun }} >
            <Header/>
            {children}
        </DataContext.Provider>
    )
}

export default MyContext
