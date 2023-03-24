import React from "react";
import sh from "@/styles/shop.module.scss";
import ShopItems from "../src/ShopItems";

const Shop = () => {
  //  버튼 클릭해서 ( 펜 / 염료 ) 스왑 기능 만들어도 될 것 같습니다.
  const pen = [
    { id: "pen1", price: 1 },
    { id: "pen2", price: 2 },
    { id: "pen3", price: 3 },
  ];
  const paint = [
    { id: "paint1", price: 1 },
    { id: "paint2", price: 2 },
    { id: "paint3", price: 3 },
  ];
  return (
    <section className={sh.shop_main}>
      <article className={sh.shop_pen}>
        {pen.map((item, key) => {
          return <ShopItems key={key} item={item}></ShopItems>;
        })}
      </article>

      <article className={sh.shop_paint}>
        {paint.map((item, key) => {
          return <ShopItems key={key} item={item}></ShopItems>;
        })}
      </article>
    </section>
  );
};

export default Shop;
