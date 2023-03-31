import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import po from "@/styles/post.module.scss";
import { DataContext } from "../src/MyContext";
import axios from "axios";
import { useSession } from "next-auth/react";

function Post() {
  // const [thisPost, setPost] = useState([]);
  const { data, who, dataPost } = useContext(DataContext);
  const commentVal = useRef();
  const initial = { USER: "", COUNT: "", COMMENT: "", POST: "" };

  const router = useRouter();
  const { query } = useRouter();
  const [inputValue, setValue] = useState(initial);
  
  const [rightBtn, setRight] = useState(false);
  const [wrongBtn, setWrong] = useState(false);
  
  const { data: session, status } = useSession();




  function valueChange(e) {
    let t = e.target;

    let countMap = 1;
    data["COMMENT"].forEach((obj, key) => {
      if (obj.POST == query.id) {
        if (obj.USER == who.ID) {
          if (obj.COUNT == 1) {
            countMap++;
          }
          if (obj.COUNT == 2) {
            countMap++;
          }
          if (obj.COUNT == 3) {
            countMap++;
          }
        }
      }
    });

    setValue({
      ...inputValue,
      COMMENT: commentVal.current.value,
      COUNT: countMap,
      USER: who.ID,
      CODENAME: who.CODENAME,
      POST: query.id,
      TRIBE: who.TRIBE,
    });

    console.log(inputValue);
  }

  async function create(e) {
    e.preventDefault();
    // console.log(data)
    // console.log(inputValue.COUNT);
    let ars = 0;
    if (inputValue.COUNT < 4) {
      dataPost("post", inputValue);
      await dataPost("get");
    } else {
      alert("기회가 모두 소진되었습니다.");
      return
    }

    data["POST"].forEach((obj, key) => {
      if (obj.ID == query.id) {
        if (inputValue.COMMENT == obj.TITLE) {
          console.log("정답!");
          ars = 3;
          // dataPost("get");
        }
      }
    });

    if(ars === 3){
      setRight(true);;
    }else{
      setWrong(true);
    }

  }
  
  function closedPop(){
    if(rightBtn){
      setRight(false);
      dataPost("put", {STATE:who.TRIBE, ID:query.id, RIGHTUSER:who.ID})
      dataPost("get")
      router.push("/page/Main");
    }
    setWrong(false);
  }
  if (!data) {
    return <>불러오는중,,,</>;
  }
  return (
    <>
      <div className={rightBtn && po.right} >
      <figure>
        <nav>
          <div onClick={closedPop}></div>
        </nav>
      </figure>
      </div>

      <div className={wrongBtn && po.wrong} >
        <figure>
          <nav>
          <div onClick={closedPop}></div>
          </nav>
        </figure>
      </div>


      {data["POST"] ? (
        data["POST"].map((obj, key) => {
          if (obj.ID == query.id) {
            return (
              <div key={key} className={po.postWrap}>
                <div className={po.boxWrap}>
                  <div className={po.boxTop}>
                    <div className={po.codeNameBox}>
                      <h1>{obj.USERCODE} 님의 본스케치</h1>
                    </div>
                  </div>
                  <div className={po.boxMid}>
                    <img src={obj.DRAW} className={po.bonescatch}></img>
                    <nav>
                      <div>
                        <h3>글자 수 : </h3>
                        <h2>{obj.TITLE.length}</h2>
                      </div>
                      {/* <div>나의 댓글 수 ( 최대 3개 ) : &nbsp; */}
                      <fieldset>
                        댓글 횟수 : &nbsp;
                        <figure>
                          <article>
                            <span></span>
                            <span></span>
                            <span></span>
                          </article>
                        {
                          data["COMMENT"].map((objs, key) => {
                            if (objs.POST == query.id) {
                              if (objs.USER == who.ID) {
                                if (objs.COUNT == 1) {
                                  return <p></p>
                                }
                                if (objs.COUNT == 2) {
                                  return <p></p>
                                }
                                if (objs.COUNT == 3) {
                                  return <p></p>
                                }
                              }
                            }
                          })
                        }
                        </figure>
                      </fieldset>
                      {/* <p>나의 남은 횟수 : {namDat}</p> */}
                    </nav>
                  </div>
                  <div className={po.boxBot}></div>

                  <div className={po.boxTop}></div>
                  {
                        obj.STATE === "미점령"
                        ? <div className={po.titleState}>
                        <nav>
                          <form onSubmit={create}>
                            <input ref={commentVal} onChange={valueChange} type="text" placeholder="정답을 입력해 주세요!" name="COMMENT" autoComplete="off" />
                            <input type="submit" value="" />
                          </form>
                        </nav>
                      </div>
                        : <></>
                  }
                  
                  {data["COMMENT"].map((obj, key) => {
                    if (obj.POST == query.id) {
                      return (
                        <div key={key} className={po.commentBox}>
                          <nav>
                            <div>
                              <img
                                className={`${obj.TRIBE === "0" && po.bburiIcon} ${obj.TRIBE === "1" && po.badaIcon} ${obj.TRIBE === "2" && po.bawiIcon} ${
                                  obj.TRIBE === "3" && po.bamIcon
                                }`}
                              ></img>
                              <h4
                                className={`${obj.TRIBE === "0" && po.bburi} ${obj.TRIBE === "1" && po.bada} ${obj.TRIBE === "2" && po.bawi} ${
                                  obj.TRIBE === "3" && po.bam
                                }`}
                              >
                                {obj.CODENAME}
                              </h4>
                              <h3>{obj.COMMENT}</h3>
                            </div>
                            <h5>{obj.DATE.match(/^((19|20)\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g)}</h5>
                          </nav>
                          <span></span>
                        </div>
                      );
                    }
                  })}
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
