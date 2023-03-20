// import React,{ useRef, useEffect, useContext, useState } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import m from '@/styles/main.module.scss'
import Link from 'next/link'


function Main({ data }) {

    const { pathname } = useRouter();


    console.log(data)
    
    if (!data) return (<>돌 날카롭게 깎는중.....</>)
    return (
        <>
            {/* <Lantern/> */}

            <Link className={m.Write} href='/page/Write'>
                글 작성하러가기
            </Link>
            <div className={m.Mwrap}>
                <div className={m.Mtop}></div>
                <div className={m.Mbot}></div>
                <div className={m.Mtop}></div>
                {
                    data['POST'].map(res => {
                    return <div key={res.ID} className={m.Mmid}>
                        <p>  {res.USER}  님의 본스케치 </p>
                        <p> {res.STATE} </p>
                        {
                            res.STATE === '정답'
                            ? <p>{res.TITLE}</p>
                            : <p>글자 수 : {res.TITLE.length}</p>
                        }
                        <img src={res.DRAW}></img>
                    </div>
                    })
                }
                <div className={m.Mbot}></div>
                <div className={m.test}></div>
            </div>
            <div className={m.footer}></div>



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
    const res = await axios.get(`./api`)
    const data = res.data;
    
    data['POST'] = data['POST'].map(obj =>{
        let buf = new Buffer(obj.DRAW);
        let base64String = buf.toString('utf-8');
        obj.DRAW = base64String;
        return obj;
    });  
    return { props: { data } }
}