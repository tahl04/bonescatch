import axios from 'axios'
// import React from 'react'
import lo from '@/styles/login.module.scss'
import React,{ useRef, useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function SignUp( { data } ) {
    const { pathname } = useRouter();
    const fire0 = useRef();
    const fire1 = useRef();
    const CODEN = useRef();
    const USERN = useRef();
    const PASSN = useRef();
    const initial = {CODENAME:''}
    const [inputValue, setValue] = useState(initial);
    // const switch = useRef();
    const [useCheckID,setId] = useState(false);
    
    
    useEffect(() => {
    }, [pathname]);

    // console.log(data);
    
    function valueChange(e) {
        let t = e.target;
        setValue({ ...inputValue, [t.name]: t.value });
        console.log(inputValue);
    }


    function create(e) {
        e.preventDefault();
        if(!useCheckID){
            IdSame('닉네임을 중복확인을 해주세요.');
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
                
                <h3>부족 선택</h3>
                <figcaption>
                    <img></img>
                    <img></img>
                    <img></img>
                    <img></img>
                </figcaption>

                <nav>
                    <imput type='button' className={lo.submitBtn} onClick={create}>생성!</imput>
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


export async function getServerSideProps() {
    const res = await axios.get(`https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api`)
    const data = res.data;
    
  //   data['POST'] = data['POST'].map(obj =>{
  //     let buf = new Buffer(obj.DRAW);
  //     let base64String = buf.toString('utf-8');
  //     obj.DRAW = base64String;
  //     return obj;
  // });  
    return { props: { data } }
}


export default SignUp
