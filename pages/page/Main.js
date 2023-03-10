import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import m from '@/styles/main.module.scss'


function Main({ data }) {
    
    if (!data) return (<>돌 날카롭게 깎는중.....</>)
    return (
        <>
            <img className={m.leaf}></img>
            <div className={m.Mwrap}>
                <img className={m.Mtop}></img>
                <img className={m.Mmid}></img>
                <img className={m.Mmid}></img>
                <img className={m.Mbot}></img>
            </div>




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