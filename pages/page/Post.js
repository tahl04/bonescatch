import React,{ useContext, useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";
import po from '@/styles/post.module.scss'
import { DataContext } from "../src/MyContext";

function Post() {


    
    // const [thisPost, setPost] = useState([]);
    const { data, who, dataFun } = useContext(DataContext);
    const [CmCount, setCmCount] = useState(0);
    const commentVal = useRef();
    
    // console.log(data)
    // CmCount.foreach((obj,key)=>{

    // })
    const initial = {USER: "", COUNT:"",COMMNET: "" };
    const { query } = useRouter();
    const [inputValue, setValue] = useState("");

    function commentMap(){
    }
    useEffect(()=>{
        console.log(who)
    },[])

    //디비
    function valueChange(e) {
        setCmCount(1);
        let t = e.target;
        let arry = [];
        data['COMMENT'].map((obj,key)=>{
            if(obj.USER == who[0].ID){
                arry.push(obj.COUNT);
            }
        })
        if(arry.length === 3){
            return alert("더이상 입력 할 수 없습니다");
        }else if(arry.length === 2){
            return setCmCount(3)
        }else if(arry.length === 1){
            return setCmCount(2)
        }else if(arry.length === 0){
            return setCmCount(1)
        }

        setValue({ ...inputValue, [t.name]: t.value ,COUNT:CmCount});
        console.log(inputValue)
    
    }
    async function create(e) {
        e.preventDefault();
        let t = e.target;
        let arry = [];
        data['COMMENT'].map((obj,key)=>{
            if(obj.USER == who[0].ID){
                arry.push(obj.COUNT);
            }
        })
        setCmCount(1);
        if(arry.length === 3){
            alert("더이상 입력 할 수 없습니다");
        }else if(arry.length === 2){
            setCmCount(3)
        }else if(arry.length === 1){
            setCmCount(2)
        }else if(arry.length === 0){
            setCmCount(1)
        }
        
        setValue({COMMENT: commentVal.current.value, COUNT:CmCount, USER:who[0].ID});
        console.log(inputValue)

        // dataFun("post", inputValue);
        // await dataFun("get");
        // // router.push("/page/Main");
    }


    if(!data){return (<>불러오는중,,,</>)}
  return (
    <>
{

data["POST"] ? 
data["POST"].map((obj, key)=>{
    if(obj.ID == query.id){
        return <div className={po.postWrap}>
            <div className={po.boxWrap}>
                <div className={po.boxTop}>
                    <div className={po.codeNameBox}>
                        <h1>{obj.USER} 님의 본스케치</h1>
                    </div>
                </div>
                <div className={po.boxMid}>
                    <img key={key} src={obj.DRAW} className={po.bonescatch}></img>
                    <h3>글자 수 : <h2>{obj.TITLE.length}</h2> !</h3>
                </div>
                <div className={po.boxBot}></div>
                <div className={po.titleState}>
                    
                <form onSubmit={create}>
                    <input ref={commentVal} onChange={valueChange} type="text" placeholder="제목" name="COMMENT" />
                    {/* {
                        data['COMMENT'].map((obj,key)=>{
                            if(obj.USER === who.ID){
                                setCmCount(obj.COUNT);
                                <input onChange={valueChange} placeholder="제목" name="COMMENT" value={obj.COUNT}/>
                            }
                        })
                    } */}
                    <input type="submit" value="저장" />
                </form>


                </div>
                <div className={po.boxTop1}></div>
                <div className={po.boxMid1}></div>
                <div className={po.boxBot1}></div>
            </div>

        </div>
    } 
})
    :
    <div>불러오는중</div>
}

    </>
  )
}

export default Post