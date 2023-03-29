import { useRouter } from "next/router";
import { useRef, useEffect, useContext, useState } from "react";
import { DataContext } from "../src/MyContext";
import wr from "@/styles/draw.module.scss";

const Draw = () => {
  const { pathname } = useRouter();
  
  const [popCheck, setPop] = useState(false);
  
  //색 셋팅
  let strokeCol = "#754d22";
  const pallet = ["black", "#2951d4", "#d43d29", "#42ad27", "#982cca", "#e4d726", "#e48b26", strokeCol];
  const [parts, setParts] = useState([strokeCol, strokeCol, strokeCol, strokeCol]);
  

  const emp = useRef([]),
    bla = useRef([]),
    blu = useRef([]),
    red = useRef([]),
    gre = useRef([]),
    pup = useRef([]),
    yel = useRef([]),
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
  const initial = { USER: "", DRAW: "", TITLE: "", STATE: "" };
  const [inputValue, setValue] = useState(initial);

  //그림판
  useEffect(() => {
    //시작 시

    //canvas 셋팅
    const canvas = canvasw.current;
    const ctx = canvas.getContext("2d");
    canvas.fillStyle = start_background_color;
    canvas.width = 600;
    canvas.height = 400;
    var mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    useColors.current.map((obj, key) => {
      obj.addEventListener("click", () => {
        strokeCol = parts[key];
        ctx.strokeStyle = strokeCol;
        // console.log(parts, strokeCol);
      });
    });
    ctx.strokeStyle = strokeCol;

    ctx.lineWidth = 5;
    brushSize.current.map((obj, key) => {
      obj.addEventListener("click", () => {
        if (key === 0) {
          ctx.lineWidth = 5;
        } else {
          ctx.lineWidth = key * 4 + 3;
        }
      });
    });
    ctx.strokeStyle = strokeCol;

    //뒤로가기 버튼
    //keycode 17 90
    document.addEventListener("keydown", function (e) {
      const keyCode = e.keyCode;
      // console.log('pushed key ' + e.key);

      if (keyCode == 17) {
        // if(keyCode == 90){
        //     console.log("gdasdsad");
        // }
      }
      // else if(keyCode == 9){
      //     // Tab key
      // //   document.dispatchEvent(new KeyboardEvent('keydown', {key: 't'}));
      //   // document.dispatchEvent(new KeyboardEvent('keyup', {key: 't'}));
      // }
    });

    //되돌리기
    backBtn.current.addEventListener("click", () => {
      // const context = canvasw.current.getContext("2d");
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
        // if(index < 0){
        //   index += 1;
        // }
        index += 1;
        saveIndex = index;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        canvas.addEventListener("mousemove", onPaint, false);
        console.log(index);
        console.log("셋인덱스" + saveIndex);
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
    // setCtx(ctx);

    
    
  }, []);
  
  

  //파츠 클릭시
  function colorChange(keyColor, index) {
    const copyParts = parts;
    copyParts[keyColor] = pallet[index];
    canvasw.current.getContext("2d").strokeStyle = pallet[index];

    // 그릇 변경
    parts.map((obj, key) => {
      if (obj === "#754d22") {
        emp.current[key].style.display = "block";
        bla.current[key].style.display = "none";
        blu.current[key].style.display = "none";
        red.current[key].style.display = "none";
        gre.current[key].style.display = "none";
        pup.current[key].style.display = "none";
        yel.current[key].style.display = "none";
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
        ora.current[key].style.display = "block";
        return;
      }
    });
  }

  //사진 배열에 넣기
  function saveImage() {
    var canvas = canvasw.current;
    var imgDataUrl = canvas.toDataURL("image/png");
    console.log(imgDataUrl);
    setValue({ ...inputValue, DRAW: imgDataUrl });
  }


  const drawSave = () => {
    setValue({DRAW:canvasw.current.toDataURL("image/png"),
    USER: who.ID, STATE: "미점령", USERCODE: who.CODENAME, TITLE: titleVal.current.value});
    setPop(!popCheck);
  };

  function reDraw(){
    setPop(!popCheck);
  }

  //디비
  async function uploadBonescatch(){
    dataFun("post", inputValue);
    await dataFun("get");
    router.push("/page/Main");
  }


  return (
    <>
    {/* <div style={{display:'none'}} className={popCheck && wr.checkPop}> */}
    <div className={popCheck ? `${wr.checkPop} ${wr.popActive} ` : wr.checkPop}>
      <figure>
        <nav>
          <h2>정답은 : '' {inputValue.TITLE == "" ? "?" : inputValue.TITLE} ''</h2>
          {
            popCheck &&  <div style={{backgroundImage:`url(${inputValue.DRAW})`}} className={wr.bonescatch}></div>
          }
          <ul>
            <li onClick={uploadBonescatch}>올리기 !</li>
            <li onClick={reDraw}>다시 그리기 !</li>
          </ul>
        </nav>
      </figure>
    </div>



      <div className={wr.wrap}>


        
        <div className={wr.drawBox}>
          <div className={wr.top} />
          <div className={wr.body}>
            <nav>
              <div className={wr.tool}>
                <button className={wr.toolBtn} ref={(el) => (brushSize.current[0] = el)}>
                  <img className={wr.toolOne}></img>
                </button>
                <button className={wr.toolBtn} ref={(el) => (brushSize.current[1] = el)}>
                  <img className={wr.toolTwo}></img>
                </button>
                <button className={wr.toolBtn}>
                  <img className={wr.toolEmp}></img>
                </button>
                <button className={wr.toolBtn} ref={(el) => (brushSize.current[2] = el)}>
                  <img className={wr.toolTre}></img>
                </button>
              </div>
              <div className={wr.canWrap}>
                <canvas ref={canvasw} className={wr.paint}></canvas>
                <div className={wr.edit}>
                  <button ref={backBtn} type="button">
                    되돌리기
                  </button>
                  <button ref={allDel} type="button">
                    지우기
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
                  <img ref={(el) => (ora.current[key] = el)} className={wr.colorOra} style={{ display: "none" }}></img>
                  <img ref={(el) => (emp.current[key] = el)} className={wr.colorEmp}></img>
                  <ul>
                    <li onClick={() => colorChange(key, 0)} ref={(el) => (selectParts.current[0] = el)}>
                      <img src="/img/item/parts-black0.png"></img>
                    </li>
                    <li onClick={() => colorChange(key, 1)} ref={(el) => (selectParts.current[1] = el)}>
                      <img src="/img/item/parts-blue0.png"></img>
                    </li>
                    <li onClick={() => colorChange(key, 2)} ref={(el) => (selectParts.current[2] = el)}>
                      <img src="/img/item/parts-red0.png"></img>
                    </li>
                    <li onClick={() => colorChange(key, 3)} ref={(el) => (selectParts.current[3] = el)}>
                      <img src="/img/item/parts-green0.png"></img>
                    </li>
                    <li onClick={() => colorChange(key, 4)} ref={(el) => (selectParts.current[4] = el)}>
                      <img src="/img/item/parts-puple0.png"></img>
                    </li>
                    <li onClick={() => colorChange(key, 5)} ref={(el) => (selectParts.current[5] = el)}>
                      <img src="/img/item/parts-yellow0.png"></img>
                    </li>
                    <li onClick={() => colorChange(key, 6)} ref={(el) => (selectParts.current[6] = el)}>
                      <img src="/img/item/parts-orange0.png"></img>
                    </li>
                    <li onClick={() => colorChange(key, 7)} ref={(el) => (selectParts.current[7] = el)}>
                      <img src="/img/item/parts-empty0.png"></img>
                    </li>
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        <div className={wr.textBox}>
          <nav>
              <input ref={titleVal} type="text" placeholder="본스케치  제목을 입력해 주세요." name="TITLE" />
            <div onClick={drawSave}/>
          </nav>
        </div>



      </div>
    </>
  );
};

export default Draw;
