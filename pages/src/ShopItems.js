import React, { useContext } from "react";
import { DataContext } from "./MyContext";
import sh from "@/styles/shop.module.scss";

const ShopItems = ({ item }) => {
  const { who } = useContext(DataContext);

  function purchase() {
    if (item.PRICE < who.SHELL) {
      console.log("구매 가능", item.PRICE);
    } else {
      console.log("구매 불가", item.PRICE);
    }
  }

  return (
    <figure className={item.TYPE === "PEN" ? sh.pen : sh.paint} onClick={purchase}>
      <div className={sh.shop_item_image_space}>
        {item.TYPE === "PEN" ? (
          <img src={`/img/draw/${item.IMG}-0.png`} alt="shop item image" />
        ) : (
          <img src={`/img/item/${item.IMG}0.png`} alt="shop item image" />
        )}
      </div>
    </figure>
  );
};

export default ShopItems;
