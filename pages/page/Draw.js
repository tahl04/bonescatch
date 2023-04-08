import { useRouter } from "next/router";
import { useRef, useEffect, useContext, useState } from "react";
import { DataContext } from "../src/MyContext";
import wr from "@/styles/draw.module.scss";

const Draw = () => {

  // 그림과 제목을 확인하는 팝업창 스위치
  const [popCheck, setPop] = useState(false);

  //색 셋팅

  let strokeCol = "#754d22";

  const pallet = ["black", "#2951d4", "#d43d29", "#42ad27", "#982cca", "#e4d726", "#eeeeee", "#e48b26", strokeCol];
  const [parts, setParts] = useState([strokeCol, strokeCol, strokeCol, strokeCol]);
  const { mine } = useContext(DataContext);

  // 보유하고 있는 도구와 재료
  const [pen, setPen] = useState();
  const [paint, setPaint] = useState();

  // 내 소지품을 불러와 useState 훅에 넣어 사용
  useEffect(() => {
    if (mine !== undefined) {
      setPen(mine.pen.split(","));
      setPaint(mine.paint.split(","));
    }
  }, [mine]);

  //컬러 파레트
  const emp = useRef([]),
    bla = useRef([]),
    blu = useRef([]),
    red = useRef([]),
    gre = useRef([]),
    pup = useRef([]),
    yel = useRef([]),
    whi = useRef([]),
    ora = useRef([]);

  //그림판
  const canvasw = useRef(null);
  const useColors = useRef([]);
  const brushSize = useRef([]);
  const backBtn = useRef([]);
  const allDel = useRef([]);
  const selectParts = useRef([]);
  const titleVal = useRef();
  let start_background_color = "transparent";
  let index = -1;
  let saveIndex = index;
  let restore_array = [];
  
  //디비
  const { dataFun, who } = useContext(DataContext);
  const router = useRouter();
  const initial = { USER: "", DRAW: "", TITLE: "", STATE: "", RIGHTUSER: "" };
  const [inputValue, setValue] = useState(initial);


  //그림판 구현
  useEffect(() => {

    //canvas 셋팅
    const canvas = canvasw.current;
    const ctx = canvas.getContext("2d");
    canvas.fillStyle = start_background_color;
    canvas.width = 600;
    canvas.height = 400;
    var mouse = { x: 0, y: 0 };

    canvas.addEventListener(
      "mousemove",
      function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    useColors.current.map((obj, key) => {
      obj.addEventListener("click", () => {
        strokeCol = parts[key];
        ctx.strokeStyle = strokeCol;
      });
    });
    ctx.strokeStyle = strokeCol;

    ctx.lineWidth = 15;
    brushSize.current.map((obj, key) => {
      obj.addEventListener("click", () => {
        if (key === 0) {
          ctx.lineWidth = 4;
        } else {
          ctx.lineWidth = key * 4 + 3;
        }
      });
    });
    ctx.strokeStyle = strokeCol;


    //되돌리기
    backBtn.current.addEventListener("click", () => {
      if (index <= 0) {
        ctx.fillStyle = start_background_color;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        restore_array = [];
        index = -1;
      } else {
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0);
      }
    });

    //전체 지우기 버튼
    allDel.current.addEventListener("click", () => {
      ctx.fillStyle = start_background_color;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      restore_array = [];
      index = -1;
    });

    canvas.addEventListener(
      "mousedown",
      function (e) {
        index += 1;
        saveIndex = index;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    var onPaint = function () {
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    };
  }, []);

  // 재료 파츠 클릭 시 해당 색이 담긴 파레트를 가져오는 함수
  function colorChange(keyColor, index) {
    if (paint && paint.includes((index + 1).toString())) {
      const copyParts = parts;
      copyParts[keyColor] = pallet[index];
      canvasw.current.getContext("2d").strokeStyle = pallet[index];

      //해당 색을 제외한 모든 것들을 display: none 처리를 한다.
      copyParts.map((obj, key) => {
        if (obj === "#754d22") {
          emp.current[key].style.display = "block";
          bla.current[key].style.display = "none";
          blu.current[key].style.display = "none";
          red.current[key].style.display = "none";
          gre.current[key].style.display = "none";
          pup.current[key].style.display = "none";
          yel.current[key].style.display = "none";
          whi.current[key].style.display = "none";
          ora.current[key].style.display = "none";
          return;
        } else if (obj === "black") {
          emp.current[key].style.display = "none";
          bla.current[key].style.display = "block";
          blu.current[key].style.display = "none";
          red.current[key].style.display = "none";
          gre.current[key].style.display = "none";
          pup.current[key].style.display = "none";
          yel.current[key].style.display = "none";
          whi.current[key].style.display = "none";
          ora.current[key].style.display = "none";
          return;
        } else if (obj === "#2951d4") {
          emp.current[key].style.display = "none";
          bla.current[key].style.display = "none";
          blu.current[key].style.display = "block";
          red.current[key].style.display = "none";
          gre.current[key].style.display = "none";
          pup.current[key].style.display = "none";
          yel.current[key].style.display = "none";
          whi.current[key].style.display = "none";
          ora.current[key].style.display = "none";
          return;
        } else if (obj === "#d43d29") {
          emp.current[key].style.display = "none";
          bla.current[key].style.display = "none";
          blu.current[key].style.display = "none";
          red.current[key].style.display = "block";
          gre.current[key].style.display = "none";
          pup.current[key].style.display = "none";
          yel.current[key].style.display = "none";
          whi.current[key].style.display = "none";
          ora.current[key].style.display = "none";
          return;
        } else if (obj === "#42ad27") {
          emp.current[key].style.display = "none";
          bla.current[key].style.display = "none";
          blu.current[key].style.display = "none";
          red.current[key].style.display = "none";
          gre.current[key].style.display = "block";
          pup.current[key].style.display = "none";
          yel.current[key].style.display = "none";
          whi.current[key].style.display = "none";
          ora.current[key].style.display = "none";
          return;
        } else if (obj === "#982cca") {
          emp.current[key].style.display = "none";
          bla.current[key].style.display = "none";
          blu.current[key].style.display = "none";
          red.current[key].style.display = "none";
          gre.current[key].style.display = "none";
          pup.current[key].style.display = "block";
          yel.current[key].style.display = "none";
          whi.current[key].style.display = "none";
          ora.current[key].style.display = "none";
          return;
        } else if (obj === "#e4d726") {
          emp.current[key].style.display = "none";
          bla.current[key].style.display = "none";
          blu.current[key].style.display = "none";
          red.current[key].style.display = "none";
          gre.current[key].style.display = "none";
          pup.current[key].style.display = "none";
          yel.current[key].style.display = "block";
          whi.current[key].style.display = "none";
          ora.current[key].style.display = "none";
          return;
        } else if (obj === "#eeeeee") {
          emp.current[key].style.display = "none";
          bla.current[key].style.display = "none";
          blu.current[key].style.display = "none";
          red.current[key].style.display = "none";
          gre.current[key].style.display = "none";
          pup.current[key].style.display = "none";
          yel.current[key].style.display = "none";
          whi.current[key].style.display = "block";
          ora.current[key].style.display = "none";
          return;
        } else if (obj === "#e48b26") {
          emp.current[key].style.display = "none";
          bla.current[key].style.display = "none";
          blu.current[key].style.display = "none";
          red.current[key].style.display = "none";
          gre.current[key].style.display = "none";
          pup.current[key].style.display = "none";
          yel.current[key].style.display = "none";
          whi.current[key].style.display = "none";
          ora.current[key].style.display = "block";
          return;
        }
      });
    } else {
      return;
    }

  }


  const drawSave = () => {
    // 그림의 제목이 없을 시 반환한다.
    if(titleVal.current.value !== ""){

      // 그림과 제목을 확인하는 팝업이다.
      setValue({
        DRAW: canvasw.current.toDataURL("image/png"),
        USER: who.ID,
        STATE: "미점령",
        USERCODE: who.CODENAME,
        TITLE: titleVal.current.value,
        RIGHTUSER: "없음",
      });
      setPop(!popCheck);
    }
    else{
      alert('제목을 입력해주세요')
      return;
    }
  };

  //다시 그리기 버튼 시 팝업창이 닫힌다.
  function reDraw() {
    setPop(!popCheck);
  }

  // 팝업에서 올리기를 누르면 posting한다.
  async function uploadBonescatch() {
    dataFun("post", inputValue);
    dataFun("get");
    await dataFun("get");
    router.push("/page/Main");
  }

  return (
    <>
      <div className={popCheck ? `${wr.checkPop} ${wr.popActive} ` : wr.checkPop}>
        <figure>
          <nav>
            <div></div>
            <div>
              <h2>정답은 : {`"`} {inputValue.TITLE == "" ? "?" : inputValue.TITLE} {`"`}</h2>
              {popCheck && <span style={{ backgroundImage: `url(${inputValue.DRAW})` }} className={wr.bonescatch}></span>}
              <ul>
                <li onClick={uploadBonescatch}>올리기 !</li>
                <li onClick={reDraw}>다시 그리기 !</li>
              </ul>
            </div>
            <div></div>
          </nav>
        </figure>
      </div>

      <div className={wr.wrap}>
        <div className={wr.drawBox}>
          <div className={wr.top} />
          <div className={wr.body}>
            <nav>
              <div className={wr.tool}>
                <button className={wr.toolBtn} ref={(el) => (brushSize.current[0] = el)} disabled={!(pen && pen.includes("4"))}>
                  <img className={pen && pen.includes("4") ? wr.toolThu : wr.toolEmp} alt="tool_feather" />
                </button>
                <button className={wr.toolBtn} ref={(el) => (brushSize.current[1] = el)} disabled={!(pen && pen.includes("1"))}>
                  <img className={pen && pen.includes("1") ? wr.toolOne : wr.toolEmp} alt="tool_wood" />
                </button>
                <button className={wr.toolBtn} ref={(el) => (brushSize.current[2] = el)} disabled={!(pen && pen.includes("2"))}>
                  <img className={pen && pen.includes("2") ? wr.toolTwo : wr.toolEmp} alt="tool_stone" />
                </button>
                <button className={wr.toolBtn} ref={(el) => (brushSize.current[3] = el)} disabled={!(pen && pen.includes("3"))}>
                  <img className={pen && pen.includes("3") ? wr.toolTre : wr.toolEmp} alt="tool_bone" />
                </button>
                {/* <button className={wr.toolBtn}>
                  <img className={wr.toolEmp}></img>
                </button> */}
              </div>
              <div className={wr.canWrap}>
                <canvas ref={canvasw} className={wr.paint}></canvas>
                <div className={wr.edit}>
                  <button ref={backBtn} type="button">
                    되돌리기
                  </button>
                  <button ref={allDel} type="button">
                    전체 지우기
                  </button>
                </div>
              </div>
            </nav>
          </div>
          <div className={wr.pallet}>
            {parts.map((obj, key) => {
              return (
                <button key={key} style={{ color: obj }} className={wr.color} ref={(el) => (useColors.current[key] = el)}>
                  <img ref={(el) => (bla.current[key] = el)} className={wr.colorBla} style={{ display: "none" }}></img>
                  <img ref={(el) => (blu.current[key] = el)} className={wr.colorBlu} style={{ display: "none" }}></img>
                  <img ref={(el) => (red.current[key] = el)} className={wr.colorRed} style={{ display: "none" }}></img>
                  <img ref={(el) => (gre.current[key] = el)} className={wr.colorGre} style={{ display: "none" }}></img>
                  <img ref={(el) => (pup.current[key] = el)} className={wr.colorPup} style={{ display: "none" }}></img>
                  <img ref={(el) => (yel.current[key] = el)} className={wr.colorYel} style={{ display: "none" }}></img>
                  <img ref={(el) => (whi.current[key] = el)} className={wr.colorWhi} style={{ display: "none" }}></img>
                  <img ref={(el) => (ora.current[key] = el)} className={wr.colorOra} style={{ display: "none" }}></img>
                  <img ref={(el) => (emp.current[key] = el)} className={wr.colorEmp}></img>
                  <ul>
                    <li
                      className={paint && paint.includes("1") ? `${wr.selectColor} ${wr.on}` : wr.selectColor}
                      onClick={() => colorChange(key, 0)}
                      ref={(el) => (selectParts.current[0] = el)}
                    >
                      <img src="/img/item/parts-black0.png"></img>
                    </li>
                    <li
                      className={paint && paint.includes("2") ? `${wr.selectColor} ${wr.on}` : wr.selectColor}
                      onClick={() => colorChange(key, 1)}
                    >
                      <img src="/img/item/parts-blue0.png"></img>
                    </li>
                    <li
                      className={paint && paint.includes("3") ? `${wr.selectColor} ${wr.on}` : wr.selectColor}
                      onClick={() => colorChange(key, 2)}
                    >
                      <img src="/img/item/parts-red0.png"></img>
                    </li>
                    <li
                      className={paint && paint.includes("4") ? `${wr.selectColor} ${wr.on}` : wr.selectColor}
                      onClick={() => colorChange(key, 3)}
                    >
                      <img src="/img/item/parts-green0.png"></img>
                    </li>
                    <li
                      className={paint && paint.includes("5") ? `${wr.selectColor} ${wr.on}` : wr.selectColor}
                      onClick={() => colorChange(key, 4)}
                    >
                      <img src="/img/item/parts-puple0.png"></img>
                    </li>
                    <li
                      className={paint && paint.includes("6") ? `${wr.selectColor} ${wr.on}` : wr.selectColor}
                      onClick={() => colorChange(key, 5)}
                    >
                      <img src="/img/item/parts-yellow0.png"></img>
                    </li>
                    <li
                      className={paint && paint.includes("7") ? `${wr.selectColor} ${wr.on}` : wr.selectColor}
                      onClick={() => colorChange(key, 6)}
                    >
                      <img src="/img/item/parts-white0.png"></img>
                    </li>
                    <li
                      className={paint && paint.includes("8") ? `${wr.selectColor} ${wr.on}` : wr.selectColor}
                      onClick={() => colorChange(key, 7)}
                    >
                      <img src="/img/item/parts-orange0.png"></img>
                    </li>
                    <li className={`${wr.selectColor} ${wr.on}`} onClick={() => colorChange(key, 8)}>
                      <img src="/img/item/parts-empty0.png"></img>
                    </li>
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        <div className={wr.rightWrap}>
          <div className={wr.textBox}>
            <nav>
              <input ref={titleVal} type="text" placeholder="본스케치  제목을 입력해 주세요." name="TITLE" maxLength={10}/>
              <div onClick={drawSave} />
            </nav>
          </div>

          <div className={wr.sulMyung}>
            <div></div>
            <div>
              <h4> - 사용법</h4>
              <h3>
                1. 좌측에 있는 석판에 그림을 기록합니다.
                <br></br>&nbsp; 우리는 그것을 본스케치라고 부릅니다
              </h3>
              <h3>
                2. 기록한 본스케치에 대한 제목을 우측 상단에<br></br>&nbsp; 입력합니다.
              </h3>
              <h3>
                3. 1번과 2번을 완료한 뒤 확인을 눌러<br></br>&nbsp; 최종 본스케치를 확인합니다.
              </h3>
              <h4> - 그 외</h4>
              <h3>- 좌측 도구를 통해 붓의 굵기를 변경할 수 있습니다.</h3>
              <h3>- 하단 파레트에 재료를 넣어 색을 변경할 수 있습니다.</h3>
              <h3>- 상점을 통해 더 많은 도구와 재료를 구해보세요.</h3>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Draw;
