import React, { useContext } from "react";
import { DataContext } from "./MyContext";

const ShopItems = ({ item }) => {
  const { who } = useContext(DataContext);

  function purchase() {
    console.log(item.TYPE, item.NAME);
    if (item.PRICE < who.SHELL) {
      console.log("구매 가능");
      // Price만큼 shell을 감소시키고 TBL_MINE 에 update요청을 보낸다.
      // update 요청 후 who 의 정보 갱신이 필요(get)
    } else {
      console.log("구매 불가");
    }
  }
  return (
    <figure>
      <img alt={`${item.TYPE} ${item.NAME}`} />
      <figcaption>{(item.TYPE, item.NAME)}</figcaption>
      <button onClick={purchase}>구매</button>
    </figure>
  );
};

export default ShopItems;
