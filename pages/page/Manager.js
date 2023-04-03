import sin from "@/styles/manager.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../src/MyContext";

function Manager() {
  const { data, who } = useContext(DataContext);


console.log(data)

  if (!data) return <div className="bonebone">
    돌 날카롭게 깎는중...
  </div>
  return (

    <div className={sin.wrap}>
      {
        who && who.ID == 1 ?
        <nav>
        <h1>신고 리스트</h1>
        <div className={sin.report}>
          {
              data["MANAGER"].map((resw) => {
                // data["POST"].map((resw) => {
                //   return <h1>asd</h1>
                // })
                return <div className={sin.reList}>
                  
                </div>
              })
          }
        </div>
        </nav>
        :
        <nav>
          <h1>비정상적인 접근입니다.</h1>
        </nav>
      }
    </div>
  )
}

export default Manager
