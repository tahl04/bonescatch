import { useRouter } from 'next/router';
import { useRef, useEffect, useContext, useState } from 'react'
import { DataContext } from '../src/MyContext';
import wr from '@/styles/write.module.scss'


const Write = () => {

    
    const { pathname } = useRouter();


    //색 셋팅
    let strokeCol = "#754d22";
    const pallet = ["black","#2951d4","#d43d29","#42ad27","#982cca","#e4d726","#e48b26",strokeCol];
    const [parts, setParts] = useState([strokeCol,strokeCol,strokeCol,strokeCol]);
    const copyParts = parts;

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
    const selectParts = useRef([]);
    // const [useColor, setColor] = useState();
    
    const [useCtx, setCtx] = useState("");
    // const [colorSwitch,setSwitch] = useState([strokeCol,strokeCol,strokeCol,strokeCol]);
    let start_background_color ="transparent";
    let index = -1;
    let restore_array =[];
    //디비
    const { dataFun } = useContext(DataContext);
    const router = useRouter();
    const initial = { USER: '', DRAW: '', TITLE: '', STATE:'' }
    const [inputValue, setValue] = useState(initial);

    //그림판

    // useEffect(()=>{
        
    // },[pathname])
    useEffect(() => {

        //시작 시
        
        // parts.map((obj,key)=>{
        //     emp.current[key].style.display = "block";
        // })
        

        //canvas 셋팅
    	const canvas = canvasw.current;
        const ctx = canvas.getContext("2d");
        canvas.fillStyle = start_background_color;
        canvas.width = 600;
        canvas.height = 400;
        var mouse = {x: 0, y: 0};
        
        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        }, false);
    
        /* Drawing on Paint App */
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
    
        useColors.current.map((obj,key)=>{
            obj.addEventListener('click',()=>{
                strokeCol = parts[key];
                ctx.strokeStyle = strokeCol;
                console.log(parts,strokeCol)
            });
        })
        ctx.strokeStyle = strokeCol;

        ctx.lineWidth = 5
        brushSize.current.map((obj,key)=>{
            obj.addEventListener('click',()=>{
                if(key === 0){
                    ctx.lineWidth = 5;
                }else{
                    ctx.lineWidth = key*4+3;
                }
            });
            
        })
            ctx.strokeStyle = strokeCol;
    
            backBtn.current.addEventListener('click',()=>{
                const context = canvasw.current.getContext("2d");
                if(index <=0){
                    clear_canvas();
                }else{
                    index -= 1;
                    restore_array.pop();
                    context.putImageData(restore_array[index],0,0);
                }
            })
        
        canvas.addEventListener('mousedown', function(e) {
            index += 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            restore_array.push(ctx.getImageData(0,0,canvas.width, canvas.height));
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);
        
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
        
        var onPaint = function() {
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };
        setCtx(ctx);
        
    }, [])



    // useEffect(()=>{
            
    // },[parts])


    //전체 지우기
    function clear_canvas(){
        const context = canvasw.current.getContext("2d");
        context.fillStyle = start_background_color;
        context.clearRect(0,0,canvasw.current.width, canvasw.current.height);
        context.fillRect(0,0,canvasw.current.width, canvasw.current.height);
        restore_array=[];
        index =-1;
    }
    //뒤로 가기
    // function undo_last(){
    //     const context = canvasw.current.getContext("2d");
    //     if(index <=0){
    //         clear_canvas();
    //     }else{
    //         index -= 1;
    //         restore_array.pop();
    //         context.putImageData(restore_array[index],0,0);
    //     }
    // }

    //완료 버튼 누를 시
    const canvasSave = ()=>{
        //캔버스에서 그리던 그림을 data화 시켜서 옮기는 과정
        var canvasData=useCtx.getImageData(0,0,canvasw.current.width,canvasw.current.height);
        console.log(canvasData);
        setValue({...initial, datazz:canvasData})
        sendImg.current.getContext("2d").putImageData(canvasData,0,0);
        console.log(initial);
    }
    






    //사진 배열에 넣기
    function saveImage() {
        var canvas = canvasw.current;
        var imgDataUrl = canvas.toDataURL('image/png');
        console.log(imgDataUrl);
        setValue({...initial, DRAW:imgDataUrl})
    }

     //파츠 클릭시
    function colorChange (keyColor, index) {
            const copyParts = parts;
            copyParts[keyColor] = pallet[index];
            canvasw.current.getContext("2d").strokeStyle = pallet[index];

            // 그릇 변경
            parts.map((obj,key)=>{
                if(obj === "#754d22"){
                    emp.current[key].style.display = "block";
                    bla.current[key].style.display = "none";
                    blu.current[key].style.display = "none";
                    red.current[key].style.display = "none";
                    gre.current[key].style.display = "none";
                    pup.current[key].style.display = "none";
                    yel.current[key].style.display = "none";
                    ora.current[key].style.display = "none";
                    return
                }else if(obj === "black"){
                    emp.current[key].style.display = "none";
                    bla.current[key].style.display = "block";
                    blu.current[key].style.display = "none";
                    red.current[key].style.display = "none";
                    gre.current[key].style.display = "none";
                    pup.current[key].style.display = "none";
                    yel.current[key].style.display = "none";
                    ora.current[key].style.display = "none";
                    return
                }else if(obj === "#2951d4"){
                    emp.current[key].style.display = "none";
                    bla.current[key].style.display = "none";
                    blu.current[key].style.display = "block";
                    red.current[key].style.display = "none";
                    gre.current[key].style.display = "none";
                    pup.current[key].style.display = "none";
                    yel.current[key].style.display = "none";
                    ora.current[key].style.display = "none";
                    return
                }else if(obj === "#d43d29"){
                    emp.current[key].style.display = "none";
                    bla.current[key].style.display = "none";
                    blu.current[key].style.display = "none";
                    red.current[key].style.display = "block";
                    gre.current[key].style.display = "none";
                    pup.current[key].style.display = "none";
                    yel.current[key].style.display = "none";
                    ora.current[key].style.display = "none";
                    return
                }else if(obj === "#42ad27"){
                    emp.current[key].style.display = "none";
                    bla.current[key].style.display = "none";
                    blu.current[key].style.display = "none";
                    red.current[key].style.display = "none";
                    gre.current[key].style.display = "block";
                    pup.current[key].style.display = "none";
                    yel.current[key].style.display = "none";
                    ora.current[key].style.display = "none";
                    return
                }else if(obj === "#982cca"){
                    emp.current[key].style.display = "none";
                    bla.current[key].style.display = "none";
                    blu.current[key].style.display = "none";
                    red.current[key].style.display = "none";
                    gre.current[key].style.display = "none";
                    pup.current[key].style.display = "block";
                    yel.current[key].style.display = "none";
                    ora.current[key].style.display = "none";
                    return
                }else if(obj === "#e4d726"){
                    emp.current[key].style.display = "none";
                    bla.current[key].style.display = "none";
                    blu.current[key].style.display = "none";
                    red.current[key].style.display = "none";
                    gre.current[key].style.display = "none";
                    pup.current[key].style.display = "none";
                    yel.current[key].style.display = "block";
                    ora.current[key].style.display = "none";
                    return
                }else if(obj === "#e48b26"){
                    emp.current[key].style.display = "none";
                    bla.current[key].style.display = "none";
                    blu.current[key].style.display = "none";
                    red.current[key].style.display = "none";
                    gre.current[key].style.display = "none";
                    pup.current[key].style.display = "none";
                    yel.current[key].style.display = "none";
                    ora.current[key].style.display = "block";
                    return
                }
            })
        }

    


    

    //디비
    function valueChange(e) {
        let t = e.target;
        setValue({ ...inputValue, [t.name]: t.value });
    }

    function create(e) {
        e.preventDefault();
        dataFun('post', inputValue)
        router.push('/');
    }
    return (
        <>
            <div className={wr.wrap}>
                <div className={wr.drawBox}>
                    <div className={wr.top}/>
                    <div className={wr.body}>
                        <nav>
                            <div className={wr.tool}>
                                <button className={wr.toolBtn} ref={el => (brushSize.current[0] = el)}><img className={wr.toolOne}></img></button>
                                <button className={wr.toolBtn} ref={el => (brushSize.current[1] = el)}><img className={wr.toolTwo}></img></button>
                                <button className={wr.toolBtn} ><img className={wr.toolEmp}></img></button>
                                <button className={wr.toolBtn} ref={el => (brushSize.current[2] = el)}><img className={wr.toolTre}></img></button>
                            </div>
                            <div className={wr.canWrap}>
                                <canvas ref={canvasw} className={wr.paint}></canvas>
                                <div className={wr.edit}>
                                    <button onClick={saveImage}>캔버스 값 가져오기</button>
                                    {/* <button onClick={undo_last} type="button">되돌리기</button> */}
                                    <button ref={backBtn} type="button">되돌리기</button>
                                    <button onClick={clear_canvas} type="button">지우기</button>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className={wr.pallet}>
                    {
                        parts.map((obj,key)=>{
                            return <button key={key} style={{color:obj}} className={wr.color} ref={el => (useColors.current[key] = el)}>
                                {/* <img className={
                                    `
                                    ${obj === "#754d22" ? wr.colorEmp : ""} 
                                    ${obj === "#2951d4" ? wr.colorBlu : ""} 
                                    ${obj === "#d43d29" ? wr.colorRed : ""} 
                                    ${obj === "#42ad27" ? wr.colorGre : ""} 
                                    ${obj === "#982cca" ? wr.colorPup : ""} 
                                    ${obj === "#e4d726" ? wr.colorYel : ""} 
                                    ${obj === "#e48b26" ? wr.colorOra : ""}
                                    ${obj === strokeCol ? wr.colorOra : ""}
                                    `}>

                                </img> */}
                                {/* <img className={wr.colorEmp}></img> */}
                                <img ref={el => (bla.current[key] = el)} className={wr.colorBla} style={{display:"none"}}></img>
                                <img ref={el => (blu.current[key] = el)} className={wr.colorBlu} style={{display:"none"}}></img>
                                <img ref={el => (red.current[key] = el)} className={wr.colorRed} style={{display:"none"}}></img>
                                <img ref={el => (gre.current[key] = el)} className={wr.colorGre} style={{display:"none"}}></img>
                                <img ref={el => (pup.current[key] = el)} className={wr.colorPup} style={{display:"none"}}></img>
                                <img ref={el => (yel.current[key] = el)} className={wr.colorYel} style={{display:"none"}}></img>
                                <img ref={el => (ora.current[key] = el)} className={wr.colorOra} style={{display:"none"}}></img>
                                <img ref={el => (emp.current[key] = el)} className={wr.colorEmp}></img>
                                <ul>
                                    <li onClick={()=>colorChange(key,0)} ref={el => (selectParts.current[0] = el)}>
                                        <img src='/img/parts-black0.png'></img>
                                    </li>
                                    <li onClick={()=>colorChange(key,1)} ref={el => (selectParts.current[1] = el)}>
                                        <img src='/img/parts-blue0.png'></img>
                                    </li>
                                    <li onClick={()=>colorChange(key,2)} ref={el => (selectParts.current[2] = el)}>
                                        <img src='/img/parts-red0.png'></img>
                                    </li>
                                    <li onClick={()=>colorChange(key,3)} ref={el => (selectParts.current[3] = el)}>
                                        <img src='/img/parts-green0.png'></img>
                                    </li>
                                    <li onClick={()=>colorChange(key,4)} ref={el => (selectParts.current[4] = el)}>
                                        <img src='/img/parts-puple0.png'></img>
                                    </li>
                                    <li onClick={()=>colorChange(key,5)} ref={el => (selectParts.current[5] = el)}>
                                        <img src='/img/parts-yellow0.png'></img>
                                    </li>
                                    <li onClick={()=>colorChange(key,6)} ref={el => (selectParts.current[6] = el)}>
                                        <img src='/img/parts-orange0.png'></img>
                                    </li>
                                    <li onClick={()=>colorChange(key,7)} ref={el => (selectParts.current[7] = el)}>
                                        <img src='/img/parts-empty0.png'></img>
                                    </li>
                                </ul>
                            </button>
                        })
                    }
                        {/* <button style={{color:'green'}} className={wr.color} ref={el => (useColors.current[0] = el)}>
                            <img className={wr.colorGre}></img>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </button>
                        <button style={{color:'red'}} className={wr.color} ref={el => (useColors.current[1] = el)}>
                            <img className={wr.colorRed}></img>
                        </button>
                        <button style={{color:'black'}} className={wr.color}>
                            <img className={wr.colorEmp}></img>
                        </button>
                        <button style={{color:'black'}} className={wr.color} ref={el => (useColors.current[2] = el)}>
                            <img className={wr.colorBla}></img>
                        </button> */}
                        {/* <button style={{color:'#aa34d8'}} className={wr.color} ref={el => (useColors.current[3] = el)}>
                            <img className={wr.colorPup}></img>
                        </button>
                        <button style={{color:'transparent'}} className={wr.color}>
                            <img className={wr.colorEmp}></img>
                        </button>
                        <button style={{color:'#3468d8'}} className={wr.color} ref={el => (useColors.current[4] = el)}>
                            <img className={wr.colorBlu}></img>
                        </button>
                        <button style={{color:'#e2d51c'}} className={wr.color} ref={el => (useColors.current[5] = el)}>
                            <img className={wr.colorYel}></img>
                        </button> */}
                        {/* <button onClick={setColor('#333333')}>Eraser</button> */}
                    </div>
                </div>


                <div className={wr.textBox}>
                    <form onSubmit={create}>
                        <p><input onChange={valueChange} type="text" placeholder='이름' name="USER" /></p>
                        {/* <p><input onChange={valueChange} type="text" placeholder='사진경로' name="datazz" /></p> */}
                        <p><input onChange={valueChange} type="text" placeholder='제목' name="TITLE" /></p>
                        <p><input onChange={valueChange} type="text" placeholder='상태' name="STATE" /></p>
                        {/* <p><input onChange={valueChange} type="text" placeholder='제목' name="TITLE" /></p> */}
                        <p><input type="submit" value="저장"/></p>
                    </form>

                </div>
            </div>





            
            {/* <button onClick={canvasSave}>캔버스 값 가져오기</button> */}
            {/* <button onClick={posting}>캔버스 값 가져오기</button> */}
            {/* <button onClick={reset}>리셋</button> */}
        </>
    )
}

export default Write