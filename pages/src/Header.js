import React from "react";
import Link from "next/link";
import hd from "@/styles/header.module.scss";
import { useRouter } from "next/router";
import { useRef, useEffect, useContext, useState } from "react";
import { DataContext } from "./MyContext";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const audio = useRef();
  const { pageChange, setClose, dataFun, who} = useContext(DataContext);
  const [audioPlay, setAudio] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  function togglePlay() {
    if (!audio.current.paused) {
      audio.current.pause();
      setAudio(!audioPlay);
    } else {
      audio.current.play();
      setAudio(!audioPlay);
    }
  }

  function pageChangeHead() {
    if (status === "unauthenticated") {
      router.push("/");
    } else {
      if (!pageChange) {
        setClose(true);
        let closed;
        closed = setTimeout(async function () {
          setClose(!pageChange);
          await dataFun("get");
          router.push("/page/Main");
        }, 1000);
      } else {
        router.push("/page/Main");
      }
    }
  }
  function toshop() {
    if (!pageChange) {
      setClose(true);
      let closed;
      closed = setTimeout(async function () {
        setClose(!pageChange);
        // await dataFun("get");
        router.push("/page/Shop");
      }, 1000);
    } else {
      router.push("/page/Shop");
    }
    // router.push("/page/Shop");
  }
  function ranking() {
    router.push("/page/Ranking");
  }
  function shhhhop(){
    router.push("/page/Dong");
  }
  function reportMana(){
    router.push("/page/Manager")
  }

  return (
    <header className={hd.header}>
      <div className={hd.music}>
        <audio loop ref={audio} src="/audio/bonescatch.mp3"></audio>
        <div className={`${hd.togglePlay} ${audioPlay && hd.active}`} onClick={togglePlay} />
      </div>

      {/* {
        who.SHELL === -1 ? 
              <div className={hd.link}>
                <img src="/img/element/logo0.png"></img>
              </div>
            :  */}
            <>
              <div className={hd.link} onClick={pageChangeHead}>
                <img src="/img/element/logo0.png"></img>
              </div>
            </>
      {/* } */}

      {/* 로그인시 로그아웃 띄움 / 로그아웃시 공백 */}
      {status === "unauthenticated" ? (
        <div className={hd.login}></div>
      ) : (
        <div className={hd.login}>
          {/* {
        who.SHELL === -1 ? <div className={hd.tyutyu}>튜토리얼 진행중</div> 
            :  */}
            <>
              {
                who && who.ID == 1 ? 
                  <button onClick={reportMana}>신고</button>
                : <>
                </>
              }
                {/* <button onClick={ranking}>랭킹</button> */}
                <button onClick={toshop}>상점</button>
                <button onClick={() => signOut()}>로그아웃</button>
            </>
          {/* } */}
        </div>
      )}
    </header>
  );
}

export default Header;
