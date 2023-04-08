import sin from "@/styles/manager.module.scss";
import React, { useContext} from "react";
import { DataContext } from "../src/MyContext";
import { useRouter } from "next/router";

function Manager() {
  
  const { data, who, reportPutData, dataFun } = useContext(DataContext);
  const router = useRouter();

  //게시물 삭제 함수
  function postDel(get){
    //게시물 삭제와 더불어 해당 게시물에 대한 중복 신고 모두 삭제
    data && data["MANAGER"].map((res) => {
      if(res.REPORT_POST == get){
        reportPutData('delete', res.ID);
      }
    })
    dataFun("delete", get)
    router.reload();
  }
  // 신고 삭제 함수
  function reportDel(get){
    reportPutData('delete', get)
    router.reload();
  }

  if (!data) return <div className="bonebone">
    돌 날카롭게 깎는중...
  </div>
  return (

    <div className={sin.wrap}>
      {
        // 관리자가 아니라면 신고목록이 보여지지 않는다. 관리자가 아니라면 헤더에 신고 바로가기가 없을테지만, 파라미터로 접근한 유저를 막기위함이다.
        who && who.ID == 1 ?
        <nav>
        <h1>신고 리스트</h1>
        <div className={sin.report}>
          {
              data["MANAGER"].map((res,key) => {
                return <div key={key} className={sin.reList}>
                  <div className={sin.reLwrap}>
                    <h2>신고 받은 아이디 {`:`} {res.REPORT_CODENAME}</h2>
                      {
                        data["POST"].map((resw,keyw) => {
                          if(res.REPORT_POST == resw.ID){
                            return <img  key={keyw} src={resw.DRAW}></img>
                          }
                        })
                      }
                      <h3>신고 사유 : </h3>
                      <h4>{res.REPORT_DETAIL}</h4>
                    </div>
                    <div className={sin.reRwrap}>
                      <div className={sin.delBtn} onClick={()=>{postDel(res.REPORT_POST, res.ID)}}>해당 게시물 삭제하기</div>
                      <div className={sin.delBtn} onClick={()=>{reportDel(res.ID)}}>해당 신고 삭제하기</div>
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
