import axios from "axios";
import lo from "@/styles/login.module.scss";
import React, { useRef, useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../src/MyContext";

function SignUp() {
  const router = useRouter();
  const { pageChange, setClose } = useContext(DataContext);
  const { pathname } = useRouter();


  // 페이지 전환 시 횃불 애니메이션
  const fire0 = useRef();
  const fire1 = useRef();
  // input 입력 값
  const CODEN = useRef();
  const USERN = useRef();
  const PASSN = useRef();
  const [accountresult, setAccountresult] = useState({ nick: "", id: "", tri: "" });
  const initial = { CODENAME: "", USER: "", PASS: "", TRIBE: "" };
  const [inputValue, setValue] = useState(initial);
  // 부족
  const bujok = useRef([]);
  // 부족 애니메이션 변경 및 선택
  const [bburi, setBburi] = useState(false);
  const [bada, setBada] = useState(false);
  const [bawi, setBawi] = useState(false);
  const [bam, setBam] = useState(false);
  // 부족 텍스트
  const [BuName, setBuName] = useState("");

  useEffect(() => {

    //부족 선택 함수
    bujok.current.map((obj, key) => {
      obj.addEventListener("click", () => {
        if (key === 0) {
          setBburi(true);
          setBada(false);
          setBawi(false);
          setBam(false);
          setBuName(" : 뿌리 풍뎅이");
        }
        if (key === 1) {
          setBburi(false);
          setBada(true);
          setBawi(false);
          setBam(false);
          setBuName(" : 바다 집게");
        }
        if (key === 2) {
          setBburi(false);
          setBada(false);
          setBawi(true);
          setBam(false);
          setBuName(" : 바위 맷돼지");
        }
        if (key === 3) {
          setBburi(false);
          setBada(false);
          setBawi(false);
          setBam(true);
          setBuName(" : 밤 까마귀");
        }
      });
    });
    setClose(false);
  }, [pathname]);

  // input에 입력 내용을 변수의 넣는다.
  function valueChange(e) {
    let t = e.target;
    setValue({ ...inputValue, [t.name]: t.value });
  }

  // 아이디 생성 함수
  async function create(e) {
    e.preventDefault();

    let nick;
    let id;
    let tri;

    //닉네임 미입력 시
    if (inputValue.CODENAME === "") {
      nick = "닉네임을 입력해주세요";
    } else {
      nick = "";
    }
    //아이디 미입력 시
    if (inputValue.USER === "") {
      id = "아이디를 입력해주세요";
    } else {
      id = "";
    }
    //부족 미선택 시
    if (inputValue.TRIBE === "") {
      tri = "부족을 선택해주세요";
    } else {
      tri = "";
    }
    // 미충족 알림을 텍스트로 보여준다.
    setAccountresult({ nick: nick, id: id, tri: tri });

    // 조건 모두 충족 시 아이디를 생성한다.
    if (inputValue.CODENAME !== "" && inputValue.USER !== "" && inputValue.PASS !== "" && inputValue.TRIBE !== "") {
      let result = await axios
        .post("https://port-0-bonescatch-nx562oleyykw6l.sel3.cloudtype.app/api/auth/signup", {
          data: inputValue,
        })
        .then((res) => {
          if (res.data.message === "error") {
            setAccountresult({ ...accountresult, nick: res.data.data.nick, id: res.data.data.id });
          } else if (res.data.message === "CreateUser") {
            router.replace("/");
          }
        });
    }
  }

  //페이지 전환 애니메이션
  function closeFire() {
    setClose(true);
    let closed;
    closed = setTimeout(function () {
      router.push("/");
    }, 1000);
  }

  return (
    <>
      <div className={pageChange ? lo.leftWrapClose : lo.leftWrap}>
        <img ref={fire0} className={lo.fireLeft} />
      </div>
      <div className={pageChange ? lo.rightWrapClose : lo.rightWrap}>
        <img ref={fire1} className={lo.fireRight} />
      </div>
      <div className={lo.logWrap}>
        {/* <div className={lo.box}> */}
        <div className={`${lo.dolBox1} ${pageChange ? lo.dolBoxClose1 : lo.dolBoxOpen1}`}>
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
                <img
                  ref={(el) => (bujok.current[3] = el)}
                  className={`${lo.bam} ${bam && lo.bamActive}`}
                  onClick={() => setValue({ ...inputValue, TRIBE: 3 })}
                ></img>
              </figcaption>
              <p>{accountresult && accountresult.tri}</p>

              <div className={lo.navDiv}>
                <div className={lo.submitBtn} onClick={create}>
                  생성!
                </div>
                <div onClick={closeFire} className={lo.submitBtn}>
                  취소!
                </div>
              </div>
            </form>
          </div>
          <div className={lo.logFoot}></div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default SignUp;
