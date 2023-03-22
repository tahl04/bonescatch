import axios from 'axios'
// import React from 'react'
import lo from '@/styles/login.module.scss'
import React,{ useRef, useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { DataContext } from '../src/MyContext'

function SignUp( ) {
    const {data} = useContext(DataContext);
    const { pathname } = useRouter();

    
    const fire0 = useRef();
    const fire1 = useRef();
    const CODEN = useRef();
    const USERN = useRef();
    const PASSN = useRef();
    const bujok = useRef([]);
    const initial = {CODENAME:''}
    const [inputValue, setValue] = useState(initial);
    // const switch = useRef();
    const [useCheckID,setId] = useState(false);


    const [bburi,setBburi] = useState(false);
    const [bada,setBada] = useState(false);
    const [bawi,setBawi] = useState(false);
    const [BuName,setBuName] = useState("");
    
    
    useEffect(() => {

        
        bujok.current.map((obj, key)=>{
            obj.addEventListener('click',()=>{
                if(key === 0){
                    setBburi(true);
                    setBada(false);
                    setBawi(false);
                    setBuName(" : 뿌리 풍뎅이");
                }
                if(key === 1){
                    setBburi(false);
                    setBada(true);
                    setBawi(false);
                    setBuName(" : 바다 집게");
                }
                if(key === 2){
                    setBburi(false);
                    setBada(false);
                    setBawi(true);
                    setBuName(" : 바위 맷돼지");
                    
                }
            });
        })


    }, [pathname]);




    console.log(data);
    
    function valueChange(e) {
        let t = e.target;
        setValue({ ...inputValue, [t.name]: t.value });
        console.log(inputValue);
    }


    function create(e) {
        e.preventDefault();
        if(!useCheckID){
            alert('닉네임을 중복확인을 해주세요.');
            CODEN.current.focus();

            return;
        }
        if(USERN.current.value === ""){
            alert('아이디를 입력해 주세요.');
            USERN.current.focus();
            return;
            // dataFun('post', inputValue)
            // router.push('/');
        }
        if(PASSN.current.value === ""){
            alert('비밀번호를 입력해 주세요.');
            PASSN.current.focus();
            return;
        }else{
            alert('진입');
            return;
        }
    }

    function IdSame(text){
        alert(text);
        CODEN.current.value = "";
        CODEN.current.focus();
        setValue({ ...inputValue, CODENAME:'' });
    }

    function checkId(e) {
        e.preventDefault();
        if(CODEN.current.value === ""){
            IdSame('닉네임을 입력해주세요.');
            return
        }else{
            data['USER'].map(obj=>{
                if(obj.CODENAME === inputValue.CODENAME){
                    IdSame('중복된 닉네임 입니다.');
                    setId(false);
                    return;
                }else{
                    setId(true);
                }
            })
            if(useCheckID){
                alert('사용 할 수 있는 아이디 입니다');
            }
        }
            // return;
    }

    //className={lo.}
    return (
    <>
        <div className={lo.logWrap}>
        <div className={lo.leftWrap}>
            <img ref={fire0} className={lo.fireLeft}/>
        </div>
        <div className={lo.rightWrap}>
            <img ref={fire1} className={lo.fireRight}/>
        </div>
        <div className={lo.logTop}>

        </div>
        <div className={lo.logBodyS}>
            <form className={lo.form}>
                <h2>회원가입</h2>
                <input ref={CODEN} onChange={valueChange} type="text" placeholder='닉네임' name="CODENAME" autoComplete='off'/>
                <nav>
                    <button onClick={checkId}>중복 확인</button>
                </nav>
                <input ref={USERN} onChange={valueChange} type="text" placeholder='아이디' name="USER" autoComplete='off'/>
                <input ref={PASSN} onChange={valueChange} type="password" placeholder='비밀번호' name="PASS"/>
                
                <h3>부족 선택 {BuName}</h3>
                <figcaption>
                    <img ref={el => (bujok.current[0] = el)} className={`${lo.bburi} ${bburi && lo.bburiActive}`}></img>
                    <img ref={el => (bujok.current[1] = el)} className={`${lo.bada} ${bada && lo.badaActive}`}></img>
                    <img ref={el => (bujok.current[2] = el)} className={`${lo.bawi} ${bawi && lo.bawiActive}`}></img>
                </figcaption>

                <nav>
                    <div className={lo.submitBtn} onClick={create}>생성!</div>
                    <Link href="/" className={lo.submitBtn}>취소!</Link>
                </nav>
                
            </form>
        </div>
        <div className={lo.logFoot}>

        </div>
        </div>
        
    </>
    )


}

//오류의 잔해,,


// export async function getStaticProps() {
//     // const res = await axios.get(`https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api`);
//     const res = await axios.get(`http://localhost:3000/api`);
//     const data = res.data;
//     return { props: { data } }
// }


export default SignUp
