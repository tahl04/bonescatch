import React from 'react'
import Link from 'next/link'
import hd from '@/styles/header.module.scss'
import { useRef, useEffect, useContext, useState } from 'react'

function Header() {
  const audio = useRef();

  
  function togglePlay () {
    if (!audio.current.paused) {
      audio.current.pause();
      setA(!a);
    } else {
      audio.current.play();
      setA(!a);
    }
  }
  useEffect(() => {
  }, []);

  
// ;

const [a,setA] = useState(false);


  return (
    <header className={hd.header}>


        <div className={hd.music}>
          <audio loop ref={audio} src="/audio/bonescatch.mp3"></audio>
          <div 
            className={ `${hd.togglePlay} ${a && hd.active}`}
            onClick={togglePlay}
          />
        </div>


        <Link className={hd.link} href="/page/Main">
            <img src='/img/logo0.png'></img>
        </Link>
        <div className={hd.login}>
          <Link href="/">로그아웃</Link>
        </div>


    </header>
  )
}

export default Header