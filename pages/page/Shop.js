import React, { useEffect, useState } from "react";
import sh from "@/styles/shop.module.scss";
import ShopItems from "../src/ShopItems";

const Shop = () => {
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);

  // 이부분은 DB 긁어와서 처리
  const pen = [
    { item_name: "pen1", price: 1 },
    { item_name: "pen2", price: 2 },
    { item_name: "pen3", price: 3 },
  ];
  const paint = [
    { item_name: "paint1", price: 1 },
    { item_name: "paint2", price: 2 },
    { item_name: "paint3", price: 3 },
  ];

  // 버튼 클릭시 아이템 리스트 전환
  useEffect(() => {
    switch (item) {
      case "PEN":
        setData(pen);
        break;
      case "PAINT":
        setData(paint);
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
        {/* <article className={sh.shop_pen}>
          {pen.map((item, key) => {
            return <ShopItems key={key} item={item}></ShopItems>;
          })}
        </article> */}
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
