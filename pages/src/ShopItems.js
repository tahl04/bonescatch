import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./MyContext";
import sh from "@/styles/shop.module.scss";
import axios from "axios";

const ShopItems = ({ item }) => {
  const { who, sessionWho, mine, sessionMine } = useContext(DataContext);

  async function purchase() {
    if (item.PRICE < who.SHELL) {
      let penArr = mine.pen.split(",");
      let paintArr = mine.paint.split(",");

      switch (item.TYPE) {
        case "PEN":
          if (penArr.includes(item.NAME)) {
            console.log("보유중인 아이템");
            return;
          } else {
            penArr.push(item.NAME);
            await axios.put("/api/shop", {
              id: who.ID,
              shell: who.SHELL - item.PRICE,
              pen: penArr.toString(),
              paint: paintArr.toString(),
            });
          }
          break;
        case "PAINT":
          if (paintArr.includes(item.NAME)) {
            console.log("보유중인 아이템");
            return;
          } else {
            paintArr.push(item.NAME);
            await axios.put("/api/shop", {
              id: who.ID,
              shell: who.SHELL - item.PRICE,
              pen: penArr.toString(),
              paint: paintArr.toString(),
            });
          }
          break;
        default:
          return;
      }

      sessionWho();
      sessionMine();
    } else {
      console.log("구매 불가", item);
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
