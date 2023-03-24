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
    <main className={sh.shop_main}>
      <section className={sh.shop_section}>
        <button onClick={() => setItem("PEN")}>팬</button>
        <button onClick={() => setItem("PAINT")}>염료</button>

        {data && data.length ? (
          <article className={sh.shop_pen}>
            {data.map((item, key) => {
              return <ShopItems key={key} item={item}></ShopItems>;
            })}
          </article>
        ) : (
          <div>기본</div>
        )}
      </section>
    </main>
  );
};

export default Shop;
