import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./MyContext";
import sh from "@/styles/shop.module.scss";
import axios from "axios";

const ShopItems = ({ item, taekulrookTalk }) => {
  const { who, sessionWho, mine, sessionMine } = useContext(DataContext);

  console.log(mine)
  async function purchase() {
    if (item.PRICE <= who.SHELL) {
      let penArr = mine.pen.split(",");
      let paintArr = mine.paint.split(",");

      switch (item.TYPE) {
        case "PEN":
          if (penArr.includes(item.NAME)) {
            taekulrookTalk("상품을 준비중이야.<br/>나중에 다시 찾아줘!");
            console.log("보유중인 아이템");
            return;
          } else {
            taekulrookTalk("조개는 잘 받았어.<br/>구매한 물건은 잘 쓰도록 해.<br/>고마워!");
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
            taekulrookTalk("상품을 준비중이야.<br/>나중에 다시 찾아줘!");
            console.log("보유중인 아이템");
            return;
          } else {
            taekulrookTalk("조개는 잘 받았어.<br/>구매한 물건은 잘 쓰도록 해.<br/>고마워!");
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
      let penArr = mine.pen.split(",");
      let paintArr = mine.paint.split(",");

      switch (item.TYPE) {
        case "PEN":
          if (penArr.includes(item.NAME)) {
            taekulrookTalk("상품을 준비중이야.<br/>나중에 다시 찾아줘!");
            console.log("보유중인 아이템");
            return;
          } else {
            taekulrookTalk("응?...<br/>너 조개가 부족한거 같은데?<br/>...");
            console.log("구매 불가", item);
          }
          break;
        case "PAINT":
          if (paintArr.includes(item.NAME)) {
            taekulrookTalk("상품을 준비중이야.<br/>나중에 다시 찾아줘!");
            console.log("보유중인 아이템");
            return;
          } else {
            taekulrookTalk("응?...<br/>너 조개가 부족한거 같은데?<br/>...");
            console.log("구매 불가", item);
          }
          break;
        default:
          return;
      }

      
      // taekulrookTalk("상품을 준비중이야.<br/>나중에 다시 찾아줘!");
      console.log("구매 불가", item);
    }
  }

  if (!mine && !item) return <div className="bonebone">
    돌 날카롭게 깎는중...
  </div>
  return (
    <figure className={item.TYPE === "PEN" ? sh.pen : sh.paint} onClick={purchase}>
      <div className={sh.shop_item_image_space}>
        {
        item.TYPE === "PEN" ? (
          // <img src={`/img/draw/${item.IMG}-0.png`} alt="shop item image" />
          // <img className={item.NAME == 1 && mine.pen.match(`/${item.NAME}/g`) == item.NAME ? sh.none : sh.tool0} alt="shop item image" />
          
          <img className={`
          ${item.NAME == 1 && sh.tool0} 
          ${item.NAME == 2 && sh.tool1} 
          ${item.NAME == 3 && sh.tool2} 
          ${item.NAME == 4 && sh.tool3} 
          ${item.NAME == 4 && sh.tool3} 
          ${mine.pen.match(/1/g) == item.NAME && sh.none} 
          ${mine.pen.match(/2/g) == item.NAME && sh.none} 
          ${mine.pen.match(/3/g) == item.NAME && sh.none} 
          ${mine.pen.match(/4/g) == item.NAME && sh.none} 
          `} 
          onMouseOver={()=>{
            item.NAME == 1 && taekulrookTalk("단단한 고목나무 '나뭇가지'야!<br/>쉽게 부러지지 않으니 걱정마!<br/>조개( 10 )개로 교환해줄게!");
            item.NAME == 2 && taekulrookTalk("화강암을 깎아 만든 '뗀석기'야!<br/>끝 부분이 꽤 날카로우니 조심해!<br/>조개( 10 )개로 교환해줄게!");
            item.NAME == 3 && taekulrookTalk("코끼리의 '뼈'야!<br/>구하기 쉽지 않았어..<br/>조개( 10 )개로 교환해줄게!");
            item.NAME == 4 && taekulrookTalk("고대새의 '깃털'이야!<br/>쉽게 닳지 않으니 걱정마!<br/>조개( 10 )개로 교환해줄게!");
            mine.pen.match(/1/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.pen.match(/2/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.pen.match(/3/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.pen.match(/4/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
          }}
          alt="shop item image" />
        ) : (
          <img className={`
          ${item.NAME == 1 && sh.col0} 
          ${item.NAME == 2 && sh.col1} 
          ${item.NAME == 3 && sh.col2} 
          ${item.NAME == 4 && sh.col3} 
          ${item.NAME == 5 && sh.col4} 
          ${item.NAME == 6 && sh.col5} 
          ${item.NAME == 7 && sh.col6} 
          ${item.NAME == 8 && sh.col7}
          ${mine.paint.match(/1/g) == item.NAME && sh.none} 
          ${mine.paint.match(/2/g) == item.NAME && sh.none} 
          ${mine.paint.match(/3/g) == item.NAME && sh.none} 
          ${mine.paint.match(/4/g) == item.NAME && sh.none} 
          ${mine.paint.match(/5/g) == item.NAME && sh.none} 
          ${mine.paint.match(/6/g) == item.NAME && sh.none} 
          ${mine.paint.match(/7/g) == item.NAME && sh.none} 
          ${mine.paint.match(/8/g) == item.NAME && sh.none} 
          `} 
          onMouseOver={()=>{
            item.NAME == 1 && taekulrookTalk("바다족에서 공수한 '오징어'야!<br/>오징어 먹물을 이용해 '검은색'을<br/> 사용할 수 있어!<br/>조개( 5 )개로 교환해줄게!");
            item.NAME == 2 && taekulrookTalk("뿌리족에서 공수한 '푸른 광물'이야!<br/>광물을 갈아서 '푸른색'을<br/> 사용할 수 있어!<br/>조개( 5 )개로 교환해줄게!");
            item.NAME == 3 && taekulrookTalk("어딘가에서 발견한 '매워보이는 열매'야!<br/>열매를 사용해 '붉은색'을<br/> 사용할 수 있어!<br/>조개( 5 )개로 교환해줄게!");
            item.NAME == 4 && taekulrookTalk("어딘가에서 발견한 '따끔해보이는 열매'야!<br/>열매를 사용해 '녹색'을<br/> 사용할 수 있어!<br/>조개( 5 )개로 교환해줄게!");
            item.NAME == 5 && taekulrookTalk("밤족에서 공수한 '밤 하늘색 꽃'이야!<br/>열매를 사용해 '보라색'을<br/> 사용할 수 있어!<br/>조개( 5 )개로 교환해줄게!");
            item.NAME == 6 && taekulrookTalk("어딘가에서 발견한 '노란 열매와 꽃'이야!<br/>이것을 사용해 '노란색'을<br/> 사용할 수 있어!<br/>조개( 5 )개로 교환해줄게!");
            item.NAME == 7 && taekulrookTalk("이건 화폐인 '조개'지만,<br/>이것을 갈면 '하얀색'을<br/> 사용할 수 있어!<br/>조개( 5 )개로 쓰기좋게 갈아줄게!");
            item.NAME == 8 && taekulrookTalk("바위족에서 공수한 '구황작물'이야!<br/>이것을 사용해 '주황색'을<br/> 사용할 수 있어!<br/>조개( 5 )개로 교환해줄게!");
            mine.paint.match(/1/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.paint.match(/2/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.paint.match(/3/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.paint.match(/4/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.paint.match(/5/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.paint.match(/6/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.paint.match(/7/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
            mine.paint.match(/8/g) == item.NAME && taekulrookTalk("아쉽지만 상품이 준비중이야.<br/>다른 물건도 많으니, <br/>천천히 골라봐!");
          }}

          alt="shop item image" />
        )}
      </div>
    </figure>
  );
};

export default ShopItems;
