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
              data["MANAGER"].map((res) => {
                // data["POST"].map((resw) => {
                //   return <h1>asd</h1>
                // })
                return <div className={sin.reList}>
                  <div className={sin.reLwrap}>
                    <h2>신고 받은 아이디 {`:`} {res.REPORT_CODENAME}</h2>
                      {
                        data["POST"].map((resw) => {
                          if(res.REPORT_POST == resw.ID){
                            return <img src={resw.DRAW}></img>
                          }
                        })
                      }
                      <h3>신고 사유 : </h3>
                      <h4>{res.REPORT_DETAIL}</h4>
                    </div>
                    <div className={sin.reRwrap}>
                      <div className={sin.delBtn}>해당 게시물 삭제하기</div>
                      <div className={sin.delBtn}>해당 신고 삭제하기</div>
                    </div>
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
