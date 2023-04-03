import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import po from "@/styles/post.module.scss";
import { DataContext } from "../src/MyContext";
import axios from "axios";
import { useSession } from "next-auth/react";

function Post() {
  // const [thisPost, setPost] = useState([]);
  const router = useRouter();
  const { data, who, dataPost, dataShell, sessionWho } = useContext(DataContext);
  const commentVal = useRef();
  const initial = { USER: "", COUNT: "", COMMENT: "", POST: "" };

  const { query } = useRouter();
  const [inputValue, setValue] = useState(initial);
  
  const [rightBtn, setRight] = useState(false);
  const [wrongBtn, setWrong] = useState(false);
  const [getShellPop, setShellPop] = useState("비활성");
  const [countShells, setCountShells] = useState(1);
  
  const { data: session, status } = useSession();


  // async function countShell(){
  //   let countCoin = 0;
  //   if(data){
  //     data["COMMENT"].forEach((obj, key) => {
  //       if (obj.POST == query.id) {
  //         countCoin++;
  //       }
  //     });
  //   }
  //   setCountShells(countCoin);
  // }

  // useEffect(()=>{
  //   countShell();
  // },[data])
  

  useEffect(() => {
    let closed;
    closed = setTimeout(function () {
        if (data) {
        let countCoin = 1;
        data["COMMENT"] ? data["COMMENT"].forEach((obj, key) => {
          if (obj.POST == query.id) {
            countCoin++;
          }
        }) : countCoin = countShells;
        ;
        setCountShells(countCoin);
        }
      }, 4000);
  }, [data]);

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
  
  async function closedPop(){
    if(rightBtn){
      setRight(false);
      setShellPop("활성");
      // dataPost("put", {STATE:who.TRIBE, ID:query.id, RIGHTUSER:who.ID});
      // await dataPost("get");
      // router.push("/page/Main");
    }
    setWrong(false);
  }

  async function outPost(){
    setShellPop("비활성")
    dataPost("put", {STATE:who.TRIBE, ID:query.id, RIGHTUSER:who.ID});
    dataShell("put", {SHELL:who.SHELL+countShells, ID:who.ID});
    sessionWho();
    // await sessionWho();
    await dataPost("get");
    router.push("/page/Main");
  }
  if (!data) {
    return <div className="bonebone">돌 날카롭게 깎는중...</div>
  }
  return (
    <>

      <div className={getShellPop == "활성" ? po.addItemOne : po.hideItem}>
        <figure onClick={outPost}>
          <nav>
            <img></img>
            <div>
              <h6>&nbsp;- 화폐 <br/>모든 부족에게 통용된 화폐인 조개{`(`}{countShells}개{`)`}를 획득<br/> 했습니다.</h6>
            </div>
          </nav>
          <h1>석판을 클릭하면 창이 닫힙니다.</h1>
          </figure>
        </div>


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
                      <div className={po.titleLeng}>
                        {
                          obj.STATE != "미점령" ? 
                          <>
                            <h3>정답은 : </h3>
                            <h2>{obj.TITLE}</h2>
                          </>
                          :
                          <>
                            <h3>글자 수 : </h3>
                            <h2>{obj.TITLE.length}</h2>
                          </>
                        }
                      </div>
                    <img src={obj.DRAW} className={po.bonescatch}></img>
                    <nav>
                      {
                          obj.STATE == "미점령" && 
                      <div>
                        <img></img>
                        <h4> &nbsp;X&nbsp;  {countShells}</h4>
                      </div>
                      }
                      {
                        obj.STATE === "미점령" && obj.USER != who.ID
                        ? 
                        <fieldset>
                        나의 댓글 횟수 : &nbsp;
                        <figure>
                          <article>
                            <span></span>
                            <span></span>
                            <span></span>
                          </article>
                        {
                          who &&
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
                      :<></>
                      }
                      {/* <p>나의 남은 횟수 : {namDat}</p> */}
                    </nav>
                  </div>
                  <div className={po.boxBot}></div>

                  <div className={po.boxTop}></div>
                  {
                        obj.STATE === "미점령" && obj.USER != who.ID
                        ? 
                        <div className={po.titleState}>
                        <nav>
                          <form onSubmit={create}>
                            <input ref={commentVal} onChange={valueChange} type="text" placeholder="정답을 입력해 주세요!" name="COMMENT" autoComplete="off" />
                            <input type="submit" value="" />
                          </form>
                        </nav>
                      </div>
                        : <></>
                  }
                  
                  {data["COMMENT"].map((objw, key) => {
                    if (objw.POST == query.id) {
                      return (
                        <div key={key} className={po.commentBox}>
                          <nav>
                            <div>
                              <img
                                className={`${objw.TRIBE === "0" && po.bburiIcon} ${objw.TRIBE === "1" && po.badaIcon} ${objw.TRIBE === "2" && po.bawiIcon} ${
                                  objw.TRIBE === "3" && po.bamIcon
                                }`}
                              ></img>
                              <h4
                                className={`${objw.TRIBE === "0" && po.bburi} ${objw.TRIBE === "1" && po.bada} ${objw.TRIBE === "2" && po.bawi} ${
                                  objw.TRIBE === "3" && po.bam
                                }`}
                              >
                                {objw.CODENAME}
                              </h4>
                              <h3>{objw.COMMENT}</h3>
                            </div>
                            <h5>{objw.DATE.match(/^((19|20)\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g)}</h5>
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
      <div className="bonebone">돌 날카롭게 깎는중...</div>
      )}
    </>
  );
}

export default Post;
