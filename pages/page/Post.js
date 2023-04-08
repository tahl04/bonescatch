import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import po from "@/styles/post.module.scss";
import { DataContext } from "../src/MyContext";

function Post() {
  const router = useRouter();
  const { data, who, dataPost, dataShell, sessionWho } = useContext(DataContext);
  
  // 해당 페이지 쿼리id 값은 게시물 고유번호이며 파라미터로 할당되어있다.
  const { query } = useRouter();
  
  // 댓글
  const commentVal = useRef();
  const initial = { USER: "", COUNT: "", COMMENT: "", POST: "" };
  const [inputValue, setValue] = useState(initial);
  
  // 문제 정답, 미정답 팝업 스위치
  const [rightBtn, setRight] = useState(false);
  const [wrongBtn, setWrong] = useState(false);
  // 조개 지급 팝업
  const [getShellPop, setShellPop] = useState("비활성");
  // 조개갯수
  const [countShells, setCountShells] = useState(1);



  // 댓글 수의 따른 조개 카운터 댓글이 많아질수록 정답 시 가져갈 수 있는 조개의 갯수가 늘어난다.
  useEffect(() => {
        if (data) {
        let countCoin = 1;
        data["COMMENT"] ? data["COMMENT"].forEach((obj, key) => {
          if (obj.POST == query.id) {
            countCoin++;
          }
        }) : countCoin = countShells;
        setCountShells(countCoin);
        }
  }, [data]);


  //input 박스에 text 입력 시
  function valueChange(e) {
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

    //관련 정보를 훅에 담는다.
    setValue({
      ...inputValue,
      COMMENT: commentVal.current.value,
      COUNT: countMap,
      USER: who.ID,
      CODENAME: who.CODENAME,
      POST: query.id,
      TRIBE: who.TRIBE,
    });
  }

  //확인 버튼 누를 시
  async function create(e) {
    e.preventDefault();
    
    // 팝업이벤트 시 중복 댓글이 올라감을 방지
    if(rightBtn || wrongBtn){
      return;
    }else{
      //내용이 없다면 반환
      if(inputValue.COMMENT !== ""){
        let ars = 0;
        // 댓글 횟수가 충족되면 더 이상 글을 작성할 수 없다.
        if (inputValue.COUNT < 4) {
          // 디비에 POST한다. 관련 함수는 useContext로 받아오며, MyContext.js에서 관리한다.
          dataPost("post", inputValue);
          await dataPost("get");
          commentVal.current.value = "";
        } else {
          alert("기회가 모두 소진되었습니다.");
          return
        }
    
        //정답 시 ars에 상태값을 지정한다.
        data["POST"].forEach(obj => {
          if (obj.ID == query.id) {
            if (inputValue.COMMENT == obj.TITLE) {
              ars = 3;
            }
          }
        });
    
        // 정답 미정답 팝업
        if(ars === 3){
          setRight(true);
        }else{
          setWrong(true);
        }
      }else{
        alert("정답을 입력해 주세요.")
        return;
      }
    }

  }
  
  //정답 유무 팝업
  async function closedPop(){
    if(rightBtn){
      //정답 시 조개 지급 팝업도 활성화 시킴
      setRight(false);
      setShellPop("활성");
    }
    setWrong(false);
  }

  //조개 지급 팝업 
  async function outPost(){
    setShellPop("비활성")
    //나의 조개 갯수를 다시 정의한다.
    dataPost("put", {STATE:who.TRIBE, ID:query.id, RIGHTUSER:who.ID});
    dataShell("put", {SHELL:who.SHELL+countShells, ID:who.ID});
    sessionWho();
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
                        who && obj.STATE === "미점령" && obj.USER != who.ID
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
                                  return <p key={key}></p>
                                }
                                if (objs.COUNT == 2) {
                                  return <p key={key}></p>
                                }
                                if (objs.COUNT == 3) {
                                  return <p key={key}></p>
                                }
                              }
                            }
                          })
                        }
                        </figure>
                      </fieldset>
                      :<></>
                      }
                    </nav>
                  </div>
                  <div className={po.boxBot}></div>

                  <div className={po.boxTop}></div>
                  {
                        who && obj.STATE === "미점령" && obj.USER != who.ID
                        ? 
                        <div className={po.titleState}>
                        <nav>
                          <form onSubmit={create}>
                            <input ref={commentVal} onChange={valueChange} type="text" placeholder="정답을 입력해 주세요!" name="COMMENT" autoComplete="off" />
                            <input type="submit" value="" />
                          </form>
                        </nav>
                      </div>
                        : <div className={po.commentBox}>{who && obj.USER == who.ID ? "작성자는 정답을 맞출 수 없습니다." : "정답은 "+obj.TITLE+" 입니다."}</div>
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
