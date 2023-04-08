import React, { useEffect, useRef, useState, useContext } from "react";
import sh from "@/styles/shop.module.scss";
import ShopItems from "../src/ShopItems";
import axios from "axios";
import { DataContext } from "../src/MyContext";

const Shop = () => {
  // 나의 정보
  const { who } = useContext(DataContext);

  // 모든 물건을 담는 훅
  const [data, setData] = useState([]);

  // 물건 정렬 스위치
  const [item, setItem] = useState("PEN");

  // 말풍선
  const taekulrook = useRef();


  // 모든 물건들을 불러와 data변수에 담는다.
  function getPenData() {
    axios
      .get("/api/shop", {
        params: {
          type: "PEN",
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }
  function getPaintData() {
    axios
      .get("/api/shop", {
        params: {
          type: "PAINT",
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }

  // 보러가기 버튼 누를 시 해당 아이템을 가져오며 나열한다.
  function itemSelect() {
    switch (item) {
      case "PEN":
        setItem("PAINT");
        break;
      case "PAINT":
        setItem("PEN");
        break;
      default:
        return;
    }
  }

  //초기 값 지정 밑 함수 호출
  useEffect(() => {
    switch (item) {
      case "PEN":
        getPenData();
        break;
      case "PAINT":
        getPaintData();
        break;
      default:
        setData([]);
    }
  }, [item]);


  //말풍선 내용 함수
  function taekulrookTalk(www){
    taekulrook.current.innerHTML = www;
  }



  return (
    <>
              <div className={sh.myShell}>
                <img></img>
                <nav>
                <h3>X {who && who.SHELL}</h3>
                <h4>조개</h4>
                </nav>
              </div>

      <main className={sh.shop_main}>
        <div className={sh.shop}>
          <div className={sh.wrap}>
            <div className={sh.doduzi}>

              <div className={sh.talk}>
                <p ref={taekulrook}>안녕! 여긴 두더지 상회야!<br/>
                많은 물건들이 있으니,<br/> 천천히 구경해봐!</p>
              </div>

              <section className={sh.shop_section}>
                {data && data.length ? (
                  <article className={sh.shop_item}>
                    {data.map((item, key) => {
                      return <ShopItems key={key} item={item} taekulrookTalk={taekulrookTalk}></ShopItems>
                    })}
                  </article>
                ) : (
                  <></>
                )}
              </section>
            </div>
          </div>
        </div>
        <button className={sh.shop_btn} onClick={itemSelect}>
          {item === "PEN" ? "염료 보러가기" : "도구 보러가기"}
        </button>
      </main>
    </>
  );
};

export default Shop;
