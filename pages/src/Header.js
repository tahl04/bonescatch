import React from "react";
import Link from "next/link";
import hd from "@/styles/header.module.scss";
import { useRouter } from "next/router";
import { useRef, useEffect, useContext, useState } from "react";
import { DataContext } from "./MyContext";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const audio = useRef();
  const router = useRouter();
  const { pageChange, setClose, dataFun, who} = useContext(DataContext);
  const { status } = useSession();
  // 오디오 스위치
  const [audioPlay, setAudio] = useState(false);

  //오디오 함수
  function togglePlay() {
    if (!audio.current.paused) {
      audio.current.pause();
      setAudio(!audioPlay);
    } else {
      audio.current.play();
      setAudio(!audioPlay);
    }
  }

  // 메인으로 이동하는 함수 (헤더 로고 클릭 시)
  function pageChangeHead() {
    //로그인 정보가 없을 시 main으로의 접근을 막는다.
    if (status === "unauthenticated") {
      router.push("/");
    } else {
      //index.js -> Main.js , SignUp.js -> Main.js 애니메이션
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

  // 상점으로 이동하는 함수
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
  }
  // 랭킹 미오픈
  function ranking() {
    router.push("/page/Ranking");
  }
  // 관리자 페이지
  function reportMana(){
    router.push("/page/Manager")
  }

  return (
    <header className={hd.header}>
      <div className={hd.music}>
        <audio loop ref={audio} src="/audio/bonescatch.mp3"></audio>
        <div className={`${hd.togglePlay} ${audioPlay && hd.active}`} onClick={togglePlay} />
      </div>
            <>
              <div className={hd.link} onClick={pageChangeHead}>
                <img src="/img/element/logo0.png"></img>
              </div>
            </>

      {/* 로그인시 로그아웃 띄움 / 로그아웃시 공백 */}
      {status === "unauthenticated" ? (
        <div className={hd.login}></div>
      ) : (
        <div className={hd.login}>
            <>
              {
                //관리자 로그인시 보여줌
                who && who.ID == 1 ? 
                  <button onClick={reportMana}>신고</button>
                : <>
                </>
              }
                {/* 
                //랭킹 미오픈
                <button onClick={ranking}>랭킹</button> */}
                <button onClick={toshop}>상점</button>
                <button onClick={() => signOut()}>로그아웃</button>
            </>
        </div>
      )}
    </header>
  );
}

export default Header;
