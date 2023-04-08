import lo from "@/styles/login.module.scss";
import { useRef, useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { DataContext } from "./src/MyContext";

export default function Home() {
  const { pageChange, setClose } = useContext(DataContext);
  const { pathname } = useRouter();
  const fire0 = useRef();
  const fire1 = useRef();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [noneState, setState] = useState("");


  // 로그인 정보가 세션에 있을 시 로그인 페이지의 접근을 막는 함수
  function authCheck(){
    if(status === 'authenticated'){
      setClose(true);
      let closede;
      closede = setTimeout(function(){
        router.push(("/page/Main"));
      }, 700);
    }
    else{
      return;
    }
  }


  // 로그인
  async function signin(e) {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      NAME: e.target.USER.value,
      PASS: e.target.PASS.value,
    });

    if (!result.error) {
    } else {
      setState("일치하는 로그인 정보가 없습니다.")
    }
  }

  // 페이지 전환 시 초기값의 설정
  useEffect(() => {
    setClose(false);
  }, [pathname]);


  // 페이지 전환 및 애니메이션
  function closeFire(){
    setClose(true);
    let closed;
    closed = setTimeout(function(){
      // setClose(!pageChange);
      router.push(("/page/SignUp"));
    }, 1000);
  }

  // 로그인 상태를 확인하여 함수 호출
  useEffect(()=>{
    authCheck();
  },[status])
  return (
    <>
      <div className={pageChange ? lo.leftWrapClose : lo.leftWrap}>
        <img ref={fire0} className={lo.fireLeft} />
      </div>
      <div className={pageChange ? lo.rightWrapClose : lo.rightWrap}>
        <img ref={fire1} className={lo.fireRight} />
      </div>
      <div className={lo.logWrap}>


      <div className={`${lo.dolBox0} ${pageChange ? lo.dolBoxClose0 : lo.dolBoxOpen0}`}>

          <div className={lo.logTop}></div>
          <div className={lo.logBody}>
            <form className={lo.form} onSubmit={signin}>
              <h1>로그인</h1>

              <input type="text" placeholder="아이디" name="USER" autoComplete="off" />
              <input type="password" placeholder="비밀번호" name="PASS" />
              <p>{noneState}</p>
              <div className={lo.navDiv}>
                <button type="submit" className={lo.submitBtn}>
                  로그인
                </button>
                <div className={lo.submitBtn} onClick={closeFire}>
                  회원가입
                </div>
              </div>
            </form>
          </div>
          <div className={lo.logFoot}></div>

        </div>



      </div>
    </>
  );
}
