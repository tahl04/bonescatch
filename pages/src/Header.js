import React from 'react'
import Link from 'next/link'
import hd from '@/styles/header.module.scss'
import { useRouter } from "next/router";
import { useRef, useEffect, useContext, useState } from 'react'
import { DataContext } from "./MyContext";

function Header() {
  const audio = useRef();
  const {pageChange, setClose} = useContext(DataContext);
  const [audioPlay,setAudio] = useState(false);
  const router = useRouter();

  
  function togglePlay () {
    if (!audio.current.paused) {
      audio.current.pause();
      setAudio(!audioPlay);
    } else {
      audio.current.play();
      setAudio(!audioPlay);
    }
  }
  useEffect(() => {
  }, []);

  function pageChangeHead(){
    if(!pageChange){
      setClose(true);
      let closed;
      closed = setTimeout(function(){
        // setClose(!pageChange);
        router.push('/page/Main');
      }, 700);
    }else{
      router.push('/page/Main');
    }
  }



  return (
    <header className={hd.header}>


        <div className={hd.music}>
          <audio loop ref={audio} src="/audio/bonescatch.mp3"></audio>
          <div 
            className={ `${hd.togglePlay} ${audioPlay && hd.active}`}
            onClick={togglePlay}
          />
        </div>


        <div className={hd.link} onClick={pageChangeHead}>
            <img src='/img/logo0.png'></img>
        </div>
        <div className={hd.login}>
          <Link href="/">로그아웃</Link>
        </div>


    </header>
  )
}

export default Header