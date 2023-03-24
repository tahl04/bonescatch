import React from "react";

const ShopItems = ({ item }) => {
  function purchase() {
    console.log(item.item_name, " 구매");
  }
  return (
    <figure>
      <img alt={`${item.item_name}`}></img>
      <figcaption>{item.item_name}</figcaption>
      <button onClick={purchase}>구매</button>
    </figure>
  );
};

export default ShopItems;
