import React, { useEffect, useState } from "react";
import sh from "@/styles/shop.module.scss";
import ShopItems from "../src/ShopItems";
import axios from "axios";

const Shop = () => {
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);

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

  return (
    <>
      <main className={sh.shop_main}>
        <div className={sh.shop}>
          <div className={sh.wrap}>
            <div className={sh.doduzi}>
              <section className={sh.shop_section}>
                {data && data.length ? (
                  <article className={sh.shop_item}>
                    {data.map((item, key) => {
                      return <ShopItems key={key} item={item}></ShopItems>;
                    })}
                  </article>
                ) : (
                  <></>
                )}
              </section>
            </div>
          </div>
        </div>
        <button className={sh.shop_btn} onClick={() => setItem("PEN")}>
          팬
        </button>
        <button className={sh.shop_btn} onClick={() => setItem("PAINT")}>
          염료
        </button>
      </main>
    </>
  );
};

export default Shop;
