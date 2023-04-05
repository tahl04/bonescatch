import React, { useEffect, useRef, useState, useContext } from "react";
import sh from "@/styles/shop.module.scss";
import ShopItems from "../src/ShopItems";
import axios from "axios";
import { DataContext } from "../src/MyContext";

const Shop = () => {
  const [item, setItem] = useState("PEN");
  const [data, setData] = useState([]);
  const taekulrook = useRef();
  const { mine, who } = useContext(DataContext);

  function getPenData() {
    axios
      .get("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/shop", {
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
      .get("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/shop", {
        params: {
          type: "PAINT",
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }

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
  // 버튼 클릭시 아이템 리스트 전환
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
