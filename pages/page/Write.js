import { useRouter } from 'next/router';
import { useRef, useEffect, useContext, useState } from 'react'
import { DataContext } from '../src/MyContext';
const Write = () => {
    //그림판
    const canvasw = useRef(null);
    const sendImg = useRef(null);
    const blueColor = useRef([]);
    const brushSize = useRef([]);
    const [useColor, setColor] = useState();
    const [useCtx, setCtx] = useState("");
    let strokeCol = "black";
    let start_background_color ="transparent";
    let index = -1;
    let empty = 0;
    let restore_array =[];
    //디비
    const { dataFun } = useContext(DataContext);
    const router = useRouter();
    const initial = { name: '', datazz: '', title: '' }
    const [inputValue, setValue] = useState(initial);

    //그림판
    useEffect(() => {

        //canvas 셋팅
    	const canvas = canvasw.current;
        const ctx = canvas.getContext("2d");
        canvas.fillStyle = start_background_color;
        canvas.width = 650;
        canvas.height = 400;
        // sendImg.current.width = 500;
        // sendImg.current.height = 250;
        var mouse = {x: 0, y: 0};
        
        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        }, false);
    
        /* Drawing on Paint App */
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
    
        blueColor.current.map(obj=>{
            obj.addEventListener('click',()=>{
                strokeCol = obj.style.backgroundColor;
                ctx.strokeStyle = strokeCol;
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
    
        
        canvas.addEventListener('mousedown', function(e) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            restore_array.push(ctx.getImageData(0,0,canvas.width, canvas.height));
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);
        
        canvas.addEventListener('mouseup', function() {
            index += 1;
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
        
        var onPaint = function() {
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };
        setCtx(ctx)
    }, [])


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
    function undo_last(){
        const context = canvasw.current.getContext("2d");
        if(index <=0){
            clear_canvas();
        }else{
            index -= 1;
            restore_array.pop();
            context.putImageData(restore_array[index],0,0);
        }
    }


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
            <div>
                <form onSubmit={create}>
                    <p><input onChange={valueChange} type="text" placeholder='이름' name="USER" /></p>
                    {/* <p><input onChange={valueChange} type="text" placeholder='사진경로' name="datazz" /></p> */}
                    <p><input onChange={valueChange} type="text" placeholder='제목' name="TITLE" /></p>
                    <p><input onChange={valueChange} type="text" placeholder='상태' name="STATE" /></p>
                    {/* <p><input onChange={valueChange} type="text" placeholder='제목' name="TITLE" /></p> */}
                    <p><input type="submit" value="저장" /></p>
                </form>
            </div>

                    <canvas ref={canvasw} className="paint"></canvas>



            <div id="settings">
                <button style={{backgroundColor:'red'}} className='colorBtn r' ref={el => (blueColor.current[0] = el)}>d</button>
                <button style={{backgroundColor:'blue'}} className='colorBtn g' ref={el => (blueColor.current[1] = el)}>d</button>
                <button style={{backgroundColor:'green'}} className='colorBtn b' ref={el => (blueColor.current[2] = el)}>d</button>
                <button style={{backgroundColor:'yellow'}} className='colorBtn y' ref={el => (blueColor.current[3] = el)}>d</button>
                {/* <button onClick={setColor('#333333')}>Eraser</button> */}
            </div>

            <div id="settings">
                <button className='brushSetBtn s' ref={el => (brushSize.current[0] = el)}>d</button>
                <button className='brushSetBtn m' ref={el => (brushSize.current[1] = el)}>d</button>
                <button className='brushSetBtn l' ref={el => (brushSize.current[2] = el)}>d</button>
                <button className='brushSetBtn xl' ref={el => (brushSize.current[3] = el)}>d</button>
            </div>
            {/* <button onClick={canvasSave}>캔버스 값 가져오기</button> */}
            {/* <button onClick={posting}>캔버스 값 가져오기</button> */}
            {/* <button onClick={reset}>리셋</button> */}
            <button onClick={saveImage}>캔버스 값 가져오기</button>
            <button onClick={undo_last}type="button">되돌리기</button>
            <button onClick={clear_canvas} type="button">지우기</button>
            <canvas ref={sendImg}></canvas>
        </>
    )
}

export default Write