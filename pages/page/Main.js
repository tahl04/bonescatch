
import React, { useContext, useEffect, useState, useRef } from "react";
import m from "@/styles/main.module.scss";
import Link from "next/link";
import { DataContext } from "../src/MyContext";
import Tutorial from "./Tutorial";

function Main() {

  const { data, who, reportPutData, dataFun } = useContext(DataContext);
  // 게시물 정렬 스위치
  const [mainSwc, setSwc] = useState("전체");
  // 신고 팝업 스위치
  const [postReport, setReport] = useState("비활성");
  // 신고 정보
  const resres = {ID:"",USER:"",CODENAME:""}
  const [getRes, setRes] = useState(resres);
  const [repVal, setReVal] = useState({
    REPORT_USER:"",
    REPORT_DETAIL:"사유 없음",
    REPORT_POST:"",
    REPORT_CODENAME:"",
  });
  // 신고 사유
  const res1 = useRef();
  const res2 = useRef();
  const res3 = useRef();
  const res4 = useRef();
  const res5 = useRef();
  const res6 = useRef();


  // 게시물 정렬 스위치 함수
  function stateAll(){
    setSwc("전체");
  }
  function stateFalse(){
    setSwc("미점령");
  }
  function stateTrue(){
    setSwc("점령");
  }

  // 신고 팝업
  async function putReport(){
    let totalVal = [];
    if(res1.current.checked){
      totalVal.push("부적절한 언어가 포함된 게시물");
    }
    if(res2.current.checked){
      totalVal.push("선정적인 게시물");
    }
    if(res3.current.checked){
      totalVal.push("조개 획득을 위한 무분별한 게시물 포스팅");
    }
    if(res4.current.checked){
      totalVal.push("그림과 정답이 일치하지 않음");
    }
    if(res5.current.checked){
      totalVal.push(res6.current.value);
    }
    setReVal({
      REPORT_USER:getRes.USER,
      REPORT_DETAIL: totalVal.toString(),
      REPORT_POST:getRes.ID,
      REPORT_CODENAME:getRes.CODENAME,
    })
    setReport("비활성");
    res1.current.checked = false ;
    res2.current.checked = false ;
    res3.current.checked = false ;
    res4.current.checked = false ;
    res5.current.checked = false ;
    res6.current.value = "";
  }

  useEffect(()=>{
    if(repVal.REPORT_USER !== ''){
      reportPutData("post", repVal);
      dataFun("get");
    }
  },[repVal])


  if (!data) return <div className="bonebone">
    돌 날카롭게 깎는중...
  </div>
  return (
    <>
        {
          who && who.SHELL === -1 ? 
            <Tutorial/>
          :
          <>
            
            <Link className={m.Write} href="/page/Draw"></Link>
            <div className={m.Mwrap}>
              <div className={m.titleBox}>
                <div className={m.mainTitle}>모두의 본 스케치</div>
                <nav>
                  <div className={`${mainSwc=="전체" ? m.bornBtnActive : m.bornBtn}`} onClick={stateAll}>전체 보기</div>
                  <div className={`${mainSwc=="미점령" ? m.bornBtnActive : m.bornBtn}`} onClick={stateFalse}>미점령 본스케치 보기</div>
                  <div className={`${mainSwc=="점령" ? m.bornBtnActive : m.bornBtn}`} onClick={stateTrue}>점령 본스케치 보기</div>
                </nav>
              </div>
              <div className={m.Mtop}></div>
              <div className={m.mBody}>
                <h4>{mainSwc} 본스케치 보기</h4>
                <span></span>
              </div>
              {
                data["POST"].map((res) => {
                  if(mainSwc === "전체"){
                  return (
                    <div key={res.ID} className={m.Mmid}>
                      <h2> {res.USERCODE} 님의 본스케치 </h2>
                      {res.STATE === "미점령" ? <h3>글자 수 : {res.TITLE.length}</h3> : <h3>정답은 : {res.TITLE}</h3> }
                      <div style={{backgroundImage:`url(${res.DRAW})`}} className={m.bonescatch}>
                        {res.STATE == 0 && <img className={m.bburi}></img>}
                        {res.STATE == 1 && <img className={m.bada}></img>}
                        {res.STATE == 2 && <img className={m.bawi}></img>}
                        {res.STATE == 3 && <img className={m.bam}></img>}
                      </div>
                      {/* <Link href={}></Link> */}
                      {res.STATE == 0 && <p><b className={m.bburiB}>뿌리</b>족 점령 !</p>}
                      {res.STATE == 1 && <p><b className={m.badaB}>바다</b>족 점령 !</p>}
                      {res.STATE == 2 && <p><b className={m.bawiB}>바위</b>족 점령 !</p>}
                      {res.STATE == 3 && <p><b className={m.bamB}>밤</b>족 점령 !</p>}
                      {res.STATE == "미점령" && <h5>정답을 맞춰서 본스케치를 점령 해보세요!</h5>}
                      <nav>
                          <div>
                            <img onClick={()=>{setRes({USER:res.USER, ID:res.ID, CODENAME:res.USERCODE});setReport("활성")}} className={m.report}></img>
                            <p>신고하기</p>
                          </div>
                        <Link className={m.linkDetail} href={{ pathname: "/page/Post/", query: { id: res.ID } }}>
                          {" "}
                          바로가기{" "}
                        </Link>
                      </nav>
                      <span></span>
                    </div>
                  );
                }else if(mainSwc === "점령"){

                  if( res.STATE==0 || res.STATE==1 || res.STATE==2 || res.STATE==3){
                  return (
                    <div key={res.ID} className={m.Mmid}>
                      <h2> {res.USERCODE} 님의 본스케치 </h2>
                      {res.STATE === "미점령" ? <h3>글자 수 : {res.TITLE.length}</h3> : <h3>정답은 : {res.TITLE}</h3> }
                      <div style={{backgroundImage:`url(${res.DRAW})`}} className={m.bonescatch}>
                        {res.STATE == 0 && <img className={m.bburi}></img>}
                        {res.STATE == 1 && <img className={m.bada}></img>}
                        {res.STATE == 2 && <img className={m.bawi}></img>}
                        {res.STATE == 3 && <img className={m.bam}></img>}
                      </div>
                      {res.STATE == 0 && <p>뿌리족 점령</p>}
                      {res.STATE == 1 && <p>바다족 점령</p>}
                      {res.STATE == 2 && <p>바위족 점령</p>}
                      {res.STATE == 3 && <p>밤족 점령</p>}
                      <nav>
                          <div>
                            <img onClick={()=>{setRes({USER:res.USER, ID:res.ID, CODENAME:res.USERCODE});setReport("활성")}} className={m.report}></img>
                            <p>신고하기</p>
                          </div>
                        <Link className={m.linkDetail} href={{ pathname: "/page/Post/", query: { id: res.ID } }}>
                          {" "}
                          바로가기{" "}
                        </Link>
                      </nav>
                      <span></span>
                    </div>
                  );
                  }


                }else if(mainSwc === "미점령"){

                  if(res.STATE === "미점령"){
                    return (
                      <div key={res.ID} className={m.Mmid}>
                        <h2> {res.USERCODE} 님의 본스케치 </h2>
                        {res.STATE === "미점령" ? <h3>글자 수 : {res.TITLE.length}</h3> : <h3>정답은 : {res.TITLE}</h3> }
                        <div style={{backgroundImage:`url(${res.DRAW})`}} className={m.bonescatch}>
                        </div>
                        {res.STATE == "미점령" && <p>정답을 맞춰서 본스케치를 점령 해보세요!</p>}
                        <nav>
                          <div>
                            <img onClick={()=>{setRes({USER:res.USER, ID:res.ID, CODENAME:res.USERCODE});setReport("활성")}} className={m.report}></img>
                            <p>신고하기</p>
                          </div>
                          <Link className={m.linkDetail} href={{ pathname: "/page/Post/", query: { id: res.ID } }}>
                            {" "}
                            바로가기{" "}
                          </Link>
                        </nav>
                      <span></span>
                      </div>
                    );
                  }

                }
                })
              }
              <div className={m.Mbot}></div>
              <div className={m.test}></div>
            </div>
            <div className={m.footer}></div>

            
            <div className={postReport == "활성" ? m.reportPop : m.reportHide}>
              <figure>
                <nav>
                <div className={m.reTop}></div>
                <div className={m.reMid}>
                    <ul>
                      사유를 선택해주세요.(중복 선택 가능)
                      <li>
                        <input type="checkbox" ref={res1} id="re1"></input>
                        <label for="re1">부적절한 언어가 포함된 게시물</label>
                      </li>
                      <li>
                        <input type="checkbox" ref={res2} id="re2"></input>
                        <label for="re2">선정적인 게시물</label>
                      </li>
                      <li>
                        <input type="checkbox" ref={res3} id="re3"></input>
                        <label for="re3">조개 획득을 위한 무분별한 게시물 포스팅</label>
                      </li>
                      <li>
                        <input type="checkbox" ref={res4} id="re4"></input>
                        <label for="re4">그림과 정답이 일치하지 않음</label>
                      </li>
                      <li>
                        <input type="checkbox" ref={res5} id="re5"></input>
                        <label for="re5">
                          직접 입력하기
                          <input type="text" ref={res6} for="re5" placeholder="사유 입력"></input>
                        </label>
                        
                      </li>
                    </ul>
                    <div className={m.buttonWrap}>
                      <div onClick={putReport}>제출하기</div>
                      <div onClick={()=>{setReport("비활성");res1.current.checked = false;res2.current.checked = false;res3.current.checked = false;res4.current.checked = false;res5.current.checked = false;res6.current.value="";}}>닫기</div>
                    </div>
                  </div>
                  <div className={m.reFoot}></div>
                </nav>
              </figure>
            </div>
          </>
        }
      </>
  );
}

export default Main;