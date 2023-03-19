import React from 'react'
import l from '@/styles/lantern.module.scss'
import { useRouter } from 'next/router'
import { useRef, useEffect, useContext, useState } from 'react'

function Lantern() {
    const torch = useRef();
    const torchLight = useRef();
    const lamp = useRef();
    const { pathname } = useRouter();
    let delay = 300;
    let timer = null;
    
    useEffect(() => {
        let torchWidth = torch.current.clientWidth;
        let torchHeight = torch.current.clientHeight;
    
        let lampHeight = lamp.current.clientHeight;
        let lampWidth = lamp.current.clientWidth;
        
        const handleLampMove = (e) => {
            // console.log(e)
            const torchPosX = e.clientX - torchWidth;
            const torchPosY = e.clientY - torchHeight;

            //resize 시 재할당
            window.addEventListener("resize", () => {
                clearTimeout(timer);
                timer = setTimeout(function(){
                    torchWidth = torch.current.clientWidth;
                    torchHeight = torch.current.clientHeight;
                    lampHeight = lamp.current.clientHeight;
                    lampWidth = lamp.current.clientWidth;
                }, delay);
            });
            torchLight.current.style.transform = `translate(${torchPosX}px, ${torchPosY}px)`;
            const lampPosX = e.clientX - lampWidth / 2;
            const lampPosY = e.clientY - lampHeight / 2;
            lamp.current.style.transform = `translate(${lampPosX}px, ${lampPosY}px)`;
            
        };
        torch.current.addEventListener("mousemove", handleLampMove);
        
    }, [pathname]);
    console.log(pathname);



    // console.log(torch);
    ////


    ////
  return (
    <>
    <nav className={l.lNav}>
        <div ref={torch} className={l.tWrap}>
            <div ref={torchLight} className={l.torch}/>
        <div ref={lamp} className={l.lamp}/>
        </div>
    </nav>
    </>
  )
}

export default Lantern
