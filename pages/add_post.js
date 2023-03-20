// import React from 'react'
import React, { useRef, useEffect, useState } from 'react'

const addpost = () => {
    const canvasMain = useRef(null);
    const sendImg = useRef(null);
    const blueColor = useRef([]);
    const brushSize = useRef([]);
    const [useImg, setImg] = useState("");
    const [useCtx, setCtx] = useState("");
    let strokeCol = "black";


    useEffect(() => {
    	const canvas = canvasMain.current;
    	const Imgfin = sendImg.current;
        const ctx = canvas.getContext("2d");
        // setGetctx(ctx);
        canvas.width = 1000;
        canvas.height = 400;
        Imgfin.width = 1000;
        Imgfin.height = 400;
        var mouse = {x: 0, y: 0};
        
        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        }, false);
    
        /* Drawing on Paint App */
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
    
        console.log(blueColor)
        blueColor.current.map(obj=>{
            obj.addEventListener('click',()=>{
                strokeCol = obj.style.backgroundColor;
                ctx.strokeStyle = strokeCol;
            });
        })
        ctx.strokeStyle = strokeCol;


        brushSize.current.map((obj,key)=>{
            obj.addEventListener('click',()=>{
                if(key === 0){
                    ctx.lineWidth = 1;
                }else{
                    ctx.lineWidth = key*4;
                }
            });
        })
    
    
        //ctx.strokeStyle = 
        //ctx.strokeStyle = document.settings.colour[1].value;
        
        canvas.addEventListener('mousedown', function(e) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
        
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);
        
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
        
        var onPaint = function() {
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };
        setCtx(ctx)
    }, [])

    useEffect(()=>{
    },[])

    //완료 버튼 누를 시
    const canvasSave = ()=>{
        //캔버스에서 그리던 그림을 data화 시켜서 옮기는 과정
        var canvasData=useCtx.getImageData(0,0,canvasMain.current.width,canvasMain.current.height);
        setImg(canvasData);
        console.log(canvasData);
        sendImg.current.getContext("2d").putImageData(canvasData,0,0);
        // console.log(sendImg.current);
        
    }
    
    

    return (
        <>
                <canvas ref={canvasMain} className="paint"></canvas>

            <div id="settings">
                <button style={{backgroundColor:'red'}} className='colorBtn r' ref={el => (blueColor.current[0] = el)}/>
                <button style={{backgroundColor:'blue'}} className='colorBtn g' ref={el => (blueColor.current[1] = el)}/>
                <button style={{backgroundColor:'green'}} className='colorBtn b' ref={el => (blueColor.current[2] = el)}/>
                <button style={{backgroundColor:'yellow'}} className='colorBtn y' ref={el => (blueColor.current[3] = el)}/>
                {/* <button onClick={setColor('#333333')}>Eraser</button> */}
            </div>

            <div id="settings">
                <button className='brushSetBtn s' ref={el => (brushSize.current[0] = el)}/>
                <button className='brushSetBtn m' ref={el => (brushSize.current[1] = el)}/>
                <button className='brushSetBtn l' ref={el => (brushSize.current[2] = el)}/>
                <button className='brushSetBtn xl' ref={el => (brushSize.current[3] = el)}/>
            </div>
            <button onClick={canvasSave}>캔버스 값 가져오기</button>
            
            {/* {
                useImg === ""
                ?<h3>asd</h3>
                :<h3>{useImg}</h3>
            } */}
            <canvas className='cancan' ref={sendImg}></canvas>
        </>
    )
}

export default addpost