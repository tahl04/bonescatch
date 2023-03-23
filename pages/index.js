import lo from "@/styles/login.module.scss";
import { useRef, useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { pathname } = useRouter();
  const fire0 = useRef();
  const fire1 = useRef();
  const { data: session, status } = useSession();
  const router = useRouter();

  async function signin(e) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      NAME: e.target.USER.value,
      PASS: e.target.PASS.value,
    });

    if (!result.error) {
      console.log("로그인 성공");
      router.push("/page/Main");
    } else {
      console.log(result.error);
    }
  }

  useEffect(() => {}, [pathname]);

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
        <div className={lo.logBody}>
          <form className={lo.form} onSubmit={signin}>
            <h1>로그인</h1>

            <input type="text" placeholder="아이디" name="USER" autoComplete="off" />
            <input type="password" placeholder="비밀번호" name="PASS" />
            <nav>
              <Link className={lo.submitBtn} href="/page/SignUp">
                회원가입
              </Link>
              <button type="submit" className={lo.submitBtn} placeholder="아이디">
                로그인
              </button>
            </nav>
          </form>
        </div>
        <div className={lo.logFoot}></div>
      </div>
    </>
  );
}
