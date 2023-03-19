import axios from 'axios'
import lo from '@/styles/login.module.scss'
import { useRef, useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function Home({ data }) {

  const { pathname } = useRouter();
  const fire0 = useRef();
  const fire1 = useRef();
  
  useEffect(() => {
  }, [pathname]);
  console.log(data)

  //className={lo.}
  
  if (!data) return (<>돌 날카롭게 깎는중.....</>)
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
        <div className={lo.logBody}>
          <form className={lo.form}>
            <h1>로그인</h1>
            
            <input type="text" placeholder='아이디' name="USER" autoComplete='off'/>
            <input type="password" placeholder='비밀번호' name="USER"/>
            <nav>
              <Link className={lo.submitBtn} href="/page/SignUp">회원가입</Link>
              <imput type='button' className={lo.submitBtn} placeholder='아이디'>로그인</imput>
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
  const res = await axios.get(`http://localhost:3000/api`)
  const data = res.data;
  
//   data['POST'] = data['POST'].map(obj =>{
//     let buf = new Buffer(obj.DRAW);
//     let base64String = buf.toString('utf-8');
//     obj.DRAW = base64String;
//     return obj;
// });  
  return { props: { data } }
}

