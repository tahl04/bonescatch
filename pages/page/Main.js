import React,{ useRef, useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import m from '@/styles/main.module.scss'
import l from '@/styles/lantern.module.scss'
import Lantern from "../src/Lantern.js";


function Main({ data }) {

    
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
        
    },[], [pathname]);


    
    if (!data) return (<>돌 날카롭게 깎는중.....</>)
    return (
        <>
            {/* <Lantern/> */}
            {/* <img className={m.fire}></img> */}
            
            <nav className={l.lNav}>
                <div ref={torch} className={l.tWrap}>
                    <div ref={torchLight} className={l.torch}/>
                <div ref={lamp} className={l.lamp}/>
                </div>
            </nav>

            <div className={m.Mwrap}>
                <img className={m.Mtop}></img>
                <img className={m.Mbot}></img>
                <img className={m.Mtop}></img>
                <img className={m.Mmid}></img>
                <img className={m.Mmid}></img>
                <img className={m.Mbot}></img>
                <div className={m.test}></div>
            </div>
            <img className={m.footer}></img>



        {/* {
            data['USER'].map((res) => {
            return <div key={res.ID}>
                <p > {res.ID} </p>
                <p > {res.CODENAME} </p>
                <p > {res.NAME} </p>
            </div>
            })
        }
        {
            data['POST'].map((res, key) => {
            return <div key={res.ID}>
                <p > {res.ID} </p>
                <p > {res.STATE} </p>
                <p > {res.TITLE} </p>
                <p > {res.USER} </p>
                <img ref={el => (post.current[key] = el)} src={res.DRAW}></img>
            </div>
            })
        } */}
        </>
    )
}

export default Main
export async function getServerSideProps() {
    const res = await axios.get(`http://localhost:3000/api`)
    const data = res.data;
    
    data['POST'] = data['POST'].map(obj =>{
      let buf = new Buffer(obj.DRAW);
      let base64String = buf.toString('utf-8');
      obj.DRAW = base64String;
      return obj;
  });  
    return { props: { data } }
  }