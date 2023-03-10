import axios from 'axios'
export default function Home({ data }) {

console.log(data)

  return (
    <>
      <p>로그인</p>
      
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