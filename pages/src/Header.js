import React from "react";
import Link from "next/link";
import hd from "@/styles/header.module.scss";
import { useRouter } from "next/router";
import { useRef, useEffect, useContext, useState } from "react";
import { DataContext } from "./MyContext";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const audio = useRef();
  const { pageChange, setClose, dataFun } = useContext(DataContext);
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
    router.push("/page/Shop");
  }

  return (
    <header className={hd.header}>
      <div className={hd.music}>
        <audio loop ref={audio} src="/audio/bonescatch.mp3"></audio>
        <div className={`${hd.togglePlay} ${audioPlay && hd.active}`} onClick={togglePlay} />
      </div>

      <div className={hd.link} onClick={pageChangeHead}>
        <img src="/img/logo0.png"></img>
      </div>
      {/* 로그인시 로그아웃 띄움 / 로그아웃시 공백 */}
      {status === "unauthenticated" ? (
        <div className={hd.login}></div>
      ) : (
        <div className={hd.login}>
          <button onClick={toshop}>상점</button>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      )}
    </header>
  );
}

export default Header;
