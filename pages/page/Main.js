// import React,{ useRef, useEffect, useContext, useState } from 'react'
// import axios from 'axios'
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import m from "@/styles/main.module.scss";
import Link from "next/link";
// import Detail from '/Detail';
// import Item from '/[id]';
import { DataContext } from "../src/MyContext";
import { useSession } from "next-auth/react";

function Main() {
  const router = useRouter();
  const { data, who } = useContext(DataContext);
  const { data: session, status } = useSession();
  const [mainSwc, setSwc] = useState("전체");
  // console.log(who);

  function stateAll(){
    setSwc("전체");
  }
  function stateFalse(){
    setSwc("미점령");
  }
  function stateTrue(){
    setSwc("점령");
  }


  function move() {
    // router.push('/board');
    router.push({
      pathname: "/board",
      query: { id: 3434343 },
    });
  }
  function auth() {
    if (status === "unauthenticated") {
      router.push("/");
    } else {
      return;
    }
  }
  console.log(data);

  useEffect(() => {
    auth();
  }, [status]);
  console.log(who)

  if (!data) return <>돌 날카롭게 깎는중.....</>;
  return (
    <>
      {/* <Lantern/> */}

      <Link className={m.Write} href="/page/Draw"></Link>

      <div className={m.Mwrap}>
        <div className={m.titleBox}>
          <div className={m.mainTitle}>본 스케치</div>
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
                {res.STATE == 0 && <p>뿌리족 점령 !</p>}
                {res.STATE == 1 && <p>바다족 점령 !</p>}
                {res.STATE == 2 && <p>바위족 점령 !</p>}
                {res.STATE == 3 && <p>밤족 점령 !</p>}
                {res.STATE == "미점령" && <p>정답을 맞춰서 본스케치를 점령 해보세요!</p>}
                <nav>
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
