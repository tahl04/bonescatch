import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import po from "@/styles/post.module.scss";
import { DataContext } from "../src/MyContext";
import axios from "axios";

function Post() {
  // const [thisPost, setPost] = useState([]);
  const { data, who, dataFun, dataPost } = useContext(DataContext);
  const [CmCount, setCmCount] = useState(0);
  const commentVal = useRef();

  // CmCount.foreach((obj,key)=>{

  // })
  const initial = { USER: "", COUNT: "", COMMENT: "", POST: "" };
  // const { query } = useRouter();
  const { query } = useRouter();
  const [inputValue, setValue] = useState(initial);

  function commentMap() {}
  useEffect(() => {
    // console.log(who)
  console.log(data)
  }, []);

  console.log(query);
  //디비
  function valueChange(e) {
    let t = e.target;

    setCmCount(1);
    setValue({ ...inputValue, COMMENT: commentVal.current.value, COUNT: 1, USER: who[0].ID, CODENAME: who[0].CODENAME, POST: query.id });
    console.log(inputValue);
  }

  async function create(e) {
    e.preventDefault();
    dataPost("post", inputValue);
    await dataPost("get");
    // router.push("/page/Main");
  }

  if (!data) {
    return <>불러오는중,,,</>;
  }
  return (
    <>
      {data["POST"] ? (
        data["POST"].map((obj, key) => {
          if (obj.ID == query.id) {
            return (
              <div key={key} className={po.postWrap}>
                <div className={po.boxWrap}>
                  <div className={po.boxTop}>
                    <div className={po.codeNameBox}>
                      <h1>{obj.USER} 님의 본스케치</h1>
                    </div>
                  </div>
                  <div className={po.boxMid}>
                    <img src={obj.DRAW} className={po.bonescatch}></img>
                    <nav>
                      <h3>글자 수 : </h3>
                      <h2>{obj.TITLE.length}</h2>
                    </nav>
                  </div>
                  <div className={po.boxBot}></div>
                  
                  <div className={po.boxTop}></div>
                  <div className={po.titleState}>
                    <nav>
                        <form onSubmit={create}>
                        <input ref={commentVal} onChange={valueChange} type="text" placeholder="정답을 입력해 주세요!" name="COMMENT" />
                        <input type="submit" value=""/>
                        </form>
                    </nav>
                  </div>
                  {
                    data['COMMENT'].map((obj, key)=>{
                        if(obj.POST == query.id){
                            return(
                                <div key={key} className={po.commentBox}>
                                    <nav>
                                        <div>
                                            <h4>{obj.CODENAME}</h4>
                                            <h3>{obj.COMMENT}</h3>
                                        </div>
                                            <h5>{obj.DATE.match(/^((19|20)\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g)}</h5>
                                    </nav>
                                    <span></span>
                                </div>
                            )
                        }
                    })
                }
                    {/* <div className={po.commentBox}>
                        <nav>
                            <h4>댓글이 없습니다! 정답을 맞춰 보세요.</h4>
                        </nav>
                        <span></span>
                    </div> */}
                  <div className={po.boxBot}></div>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div>불러오는중</div>
      )}
    </>
  );
}

export default Post;
