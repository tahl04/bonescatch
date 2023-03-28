import React from 'react'
import dong from "@/styles/dong.module.scss";

function Dong() {
  return (
    <>
        <div className={dong.blackOut}>
            <img className={dong.dol5}></img>
            <img className={dong.dol4}></img>
            <img className={dong.dol3}></img>
            <img className={dong.dol2}></img>
            <img className={dong.dol1}></img>
            <img className={dong.dol0}></img>
        </div>
    </>
  )
}

export default Dong