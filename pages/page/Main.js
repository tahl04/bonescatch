// import React,{ useRef, useEffect, useContext, useState } from 'react'
// import axios from 'axios'
import React, { useContext } from "react";
import { useRouter } from "next/router";
import m from "@/styles/main.module.scss";
import Link from "next/link";
import { DataContext } from "../src/MyContext";
import { useSession } from "next-auth/react";

function Main() {
  const { data } = useContext(DataContext);
  const { data: session, status } = useSession();

  console.log(session);

  if (!data) return <>돌 날카롭게 깎는중.....</>;
  return (
    <>
      {/* <Lantern/> */}

      <Link className={m.Write} href="/page/Write">
        글 작성하러가기
      </Link>

      <div className={m.Mwrap}>
        <div className={m.Mtop}></div>
        <div className={m.Mbot}></div>
        <div className={m.Mtop}></div>
        {/* {data["POST"].map((res) => {
          return (
            <div key={res.ID} className={m.Mmid}>
              <p> {res.USER} 님의 본스케치 </p>
              <p> {res.STATE} </p>
              {res.STATE === "정답" ? <p>{res.TITLE}</p> : <p>글자 수 : {res.TITLE.length}</p>}
              <img src={res.DRAW} className={m.bonescatch}></img>
              <img className={m.underLine}></img>
            </div>
          );
        })} */}
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
