// import React,{ useRef, useEffect, useContext, useState } from 'react'
// import axios from 'axios'
import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import m from "@/styles/main.module.scss";
import Link from "next/link";
import Manager from "./Manager";
// import Detail from '/Detail';
// import Item from '/[id]';
import { DataContext } from "../src/MyContext";
import { useSession } from "next-auth/react";
import Tutorial from "./Tutorial";

function Main() {
  const router = useRouter();
  const { data, who, reportPutData, dataPost } = useContext(DataContext);
  const { data: session, status } = useSession();
  const [mainSwc, setSwc] = useState("전체");
  const [postReport, setReport] = useState("비활성");
  const resres = {ID:"",USER:"",CODENAME:""}
  const [getRes, setRes] = useState(resres);
  const [repVal, setReVal] = useState({
    REPORT_USER:"",
    REPORT_DETAIL:"",
    REPORT_POST:"",
    REPORT_CODENAME:"",
  });
  const reportForm = useRef();
  const res1 = useRef();
  const res2 = useRef();
  const res3 = useRef();
  const res4 = useRef();
  const res5 = useRef();
  const res6 = useRef();


  function stateAll(){
    setSwc("전체");
  }
  function stateFalse(){
    setSwc("미점령");
  }
  function stateTrue(){
    setSwc("점령");
  }

  async function putReport(){
    let totalVal = [];
    if(res1.current.checked){
      totalVal.push("부적절한 언어가 포함된 게시물");
      // totalVal = totalVal+"부적절한 언어가 포함된 게시물, "
    }
    if(res2.current.checked){
      totalVal.push("선정적인 게시물");
      // totalVal = totalVal+"선정적인 게시물, "
    }
    if(res3.current.checked){
      totalVal.push("조개 획득을 위한 무분별한 게시물 포스팅");
      // totalVal = totalVal+"조개 획득을 위한 무분별한 게시물 포스팅, "
    }
    if(res4.current.checked){
      totalVal.push("그림과 정답이 일치하지 않음");
      // totalVal = totalVal+"그림과 정답이 일치하지 않음, "
    }
    if(res5.current.checked){
      totalVal.push(res6.current.value);
      // totalVal = totalVal+"직접입력) "+res6.current.value;
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
    // dataPost("get");
  }

  useEffect(()=>{
    if(repVal.REPORT_USER !== ''){
      reportPutData("post", repVal);
      console.log(repVal);
    }
  },[repVal])


  console.log(data);
  if (!data) return <div className="bonebone">
    돌 날카롭게 깎는중...
  </div>
  return (
    <>
        {
          who && who.SHELL === -1 ? 
            <Tutorial/>
            // <></>
          :
          <>
            

            {/* <div className={secondGet == "활성" ? tu.addItemOne : tu.hideItem}>
            <figure onClick={secondClose}>
                    <nav className={tu.shellCoinGet}>
                      <img></img>
                      <div>
                        <h6>&nbsp;- 화폐 <br/>모든 부족에게 통용된 화폐인 조개{`(`}10개{`)`}를 획득<br/> 했습니다.</h6>
                      </div>
                    </nav>
              <h1>석판을 클릭하면 창이 닫힙니다.</h1>
              </figure>
            </div> */}


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
                      {/* <img className={m.underLine}></img> */}
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
                      {/* <Link href={}></Link> */}
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
                      {/* <img className={m.underLine}></img> */}
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
                        {/* <img className={m.underLine}></img> */}
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

// export async function getServerSideProps() {
// export async function getStaticProps() {
//     // const res = await axios.get(`https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api`);
//     const res = await axios.get(`http://localhost:3000/api`);
//     const data = res.data;

//     //db에 저장된 이미지코드를 src화 시키는 작업
//     data['POST'] = data['POST'].map(obj =>{
//         let buf = new Buffer(obj.DRAW);
//         let base64String = buf.toString('utf-8');
//         obj.DRAW = base64String;
//         return obj;
//     });
//     return { props: { data } }
// }
