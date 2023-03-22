import axios from "axios";
// import React from 'react'

import lo from '@/styles/login.module.scss'
import React,{ useRef, useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { DataContext } from '../src/MyContext'

function SignUp( ) {
    const {data} = useContext(DataContext);
    const { pathname } = useRouter();
  const [accountresult, setAccountresult] = useState({ nick: "", id: "", tri: "" });

    
    const fire0 = useRef();
    const fire1 = useRef();
    const CODEN = useRef();
    const USERN = useRef();
    const PASSN = useRef();
    const bujok = useRef([]);
  const initial = { CODENAME: "", USER: "", PASS: "", TRIBE: "" };
    const [inputValue, setValue] = useState(initial);
    // const switch = useRef();
    const [useCheckID,setId] = useState(false);


    const [bburi,setBburi] = useState(false);
    const [bada,setBada] = useState(false);
    const [bawi,setBawi] = useState(false);
    const [bam,setBam] = useState(false);
    const [BuName,setBuName] = useState("");
    
    
    useEffect(() => {

        
        bujok.current.map((obj, key)=>{
            obj.addEventListener('click',()=>{
                if(key === 0){
                    setBburi(true);
                    setBada(false);
                    setBawi(false);
                    setBam(false)
                    setBuName(" : 뿌리 풍뎅이");
                }
                if(key === 1){
                    setBburi(false);
                    setBada(true);
                    setBawi(false);
                    setBam(false)
                    setBuName(" : 바다 집게");
                }
                if(key === 2){
                    setBburi(false);
                    setBada(false);
                    setBawi(true);
                    setBam(false)
                    setBuName(" : 바위 맷돼지");
                    
                }
                if(key === 3){
                    setBburi(false);
                    setBada(false);
                    setBawi(false);
                    setBam(true)
                    setBuName(" : 밤 까마귀");
                    
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
        if (key === 1) {
          setBburi(false);
          setBada(true);
          setBawi(false);
          setBuName(" : 바다 집게");
        }
        if (key === 2) {
          setBburi(false);
          setBada(false);
          setBawi(true);
          setBuName(" : 바위 맷돼지");
        }
      });
    });
  }, [pathname]);

  function valueChange(e) {
    let t = e.target;
    setValue({ ...inputValue, [t.name]: t.value });
  }

  async function create(e) {
    e.preventDefault();

    let nick;
    let id;
    let tri;
    if (inputValue.CODENAME === "") {
      nick = "닉네임을 입력해주세요";
    } else {
      nick = "";
    }
    if (inputValue.USER === "") {
      id = "아이디를 입력해주세요";
    } else {
      id = "";
    }
    if (inputValue.TRIBE === "") {
      tri = "부족을 선택해주세요";
    } else {
      tri = "";
    }
    setAccountresult({ nick: nick, id: id, tri: tri });

    if (inputValue.CODENAME !== "" && inputValue.USER !== "" && inputValue.PASS !== "" && inputValue.TRIBE !== "") {
      let result = await axios
        .post("/api/auth/signup", {
          data: inputValue,
        })
        .then((res) => {
          if (res.data.message === "error") {
            setAccountresult({ ...accountresult, nick: res.data.nick, id: res.data.id });
          } else if (res.data.message === "CreateUser") {
            //  로그인페이지로이동
            console.log("to sign in");
          }
        });
    }
  }
  return (
    <>
      <div className={lo.logWrap}>
        <div className={lo.leftWrap}>
          <img ref={fire0} className={lo.fireLeft} />
        </div>
        <div className={lo.rightWrap}>
          <img ref={fire1} className={lo.fireRight} />
        </div>
        <div className={lo.logTop}></div>
        <div className={lo.logBodyS}>
          <form className={lo.form}>
            <h2>회원가입</h2>
            <input ref={CODEN} onChange={valueChange} type="text" placeholder="닉네임" name="CODENAME" autoComplete="off" />
            <p>{accountresult && accountresult.nick}</p>
            <input ref={USERN} onChange={valueChange} type="text" placeholder="아이디" name="USER" autoComplete="off" />
            <p>{accountresult && accountresult.id}</p>
            <input ref={PASSN} onChange={valueChange} type="password" placeholder="비밀번호" name="PASS" />

            <h3>부족 선택 {BuName}</h3>
            <figcaption>
              <img
                ref={(el) => (bujok.current[0] = el)}
                className={`${lo.bburi} ${bburi && lo.bburiActive}`}
                onClick={() => setValue({ ...inputValue, TRIBE: 0 })}
              ></img>
              <img
                ref={(el) => (bujok.current[1] = el)}
                className={`${lo.bada} ${bada && lo.badaActive}`}
                onClick={() => setValue({ ...inputValue, TRIBE: 1 })}
              ></img>
              <img
                ref={(el) => (bujok.current[2] = el)}
                className={`${lo.bawi} ${bawi && lo.bawiActive}`}
                onClick={() => setValue({ ...inputValue, TRIBE: 2 })}
              ></img>
                    <img ref={el => (bujok.current[3] = el)} className={`${lo.bam} ${bam && lo.bamActive}`} onClick={()=>setValue({...inputValue,TRIBE:3})}></img>
            </figcaption>
            <p>{accountresult && accountresult.tri}</p>

            <nav>
              <div className={lo.submitBtn} onClick={create}>
                생성!
              </div>
              <Link href="/" className={lo.submitBtn}>
                취소!
              </Link>
            </nav>
          </form>
        </div>
        <div className={lo.logFoot}></div>
      </div>
    </>
  );
}

export default SignUp;
