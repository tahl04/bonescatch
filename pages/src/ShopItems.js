import React from "react";

const ShopItems = ({ item }) => {
  console.log(item);
  function purchase() {
    console.log(item.id, " 구매");
  }
  return (
    <figure>
      <img alt={`${item.id}`}></img>
      <figcaption>{item.id}</figcaption>
      <button onClick={purchase}>구매</button>
    </figure>
  );
};

export default ShopItems;
