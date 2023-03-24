import React,{ useContext, useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";
import po from '@/styles/post.module.scss'
import { DataContext } from "../src/MyContext";
import axios from "axios";

function Post() {

    
    // const [thisPost, setPost] = useState([]);
    const { data, who, dataFun, dataPost } = useContext(DataContext);
    const [CmCount, setCmCount] = useState(0);
    const commentVal = useRef();
    
    // console.log(data)
    // CmCount.foreach((obj,key)=>{

    // })
    const initial = {USER: "", COUNT:"",COMMENT: "", POST: "" };
    // const { query } = useRouter();
    const { query } = useRouter();
    const [inputValue, setValue] = useState(initial);

    function commentMap(){
    }
    useEffect(()=>{
        // console.log(who)
    },[])

    console.log(query)
    //디비
    function valueChange(e) {
        let t = e.target;

        setCmCount(1);
        setValue({...inputValue, COMMENT: commentVal.current.value, COUNT:1, USER:who[0].ID, POST:query.id});
        console.log(inputValue);
    
    }

    
    function create(e) {
        e.preventDefault();
        dataPost("post", inputValue);
        // await dataPost("get");
        // router.push("/page/Main");
    }

    if(!data){return (<>불러오는중,,,</>)}
  return (
    <>
{

data["POST"] ? 
data["POST"].map((obj, key)=>{
    if(obj.ID == query.id){
        return <div key={key} className={po.postWrap}>
            <div className={po.boxWrap}>
                <div className={po.boxTop}>
                    <div className={po.codeNameBox}>
                        <h1>{obj.USER} 님의 본스케치</h1>
                    </div>
                </div>
                <div className={po.boxMid}>
                    <img src={obj.DRAW} className={po.bonescatch}></img>
                    <nav>
                        <h3>글자 수 : </h3><h2>{obj.TITLE.length}</h2>
                    </nav>
                </div>
                <div className={po.boxBot}></div>
                <div className={po.titleState}>
                 
                <form onSubmit={create}>
                    <input ref={commentVal} onChange={valueChange} type="text" placeholder="제목" name="COMMENT" />
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