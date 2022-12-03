
import { useCallback, useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import NavBar from '../../components/NavBar';
import axios from 'axios';  
import EditUser from '../../components/editUser';
import Link from 'next/link';
import { getCookie } from 'cookies-next';



const index = () => {
  const [data, setData] = useState('');
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    getData()
    let login = getCookie('login');
    setLogin(login) 
  }, [data]) //อยากให้อัพเดทต้องใส่เดต้า

  
  

  const getData = () => {     //ดึงดาต้า
    axios.get('http://localhost:5002/note')  //เขียนบรรทัดที่5  
      .then(function (response) { //ไม่เออเร่อ
      // console.log(response.data); 
      // console.log(response); 
        setData(response.data)          
      })
      .catch(function (error) { //เออเร่อ
        console.log(error); 
      });
  }



  const deleteUser = (e) => {
    // console.log(e)
    let text = "ยื่นยันการลบรายชื่อ";
    if (confirm(text) == true) {
      // console.log(e)

      axios.delete(`http://localhost:5002/note/${e}`)
        .then(function (response1) {
          console.log(response1)
          setMessage(response1.data.message)
          getData()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }



  return (
    <>
      <div style={{ backgroundColor: '#92CEA8', height: '100%', minHeight: '100vh' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'cornsilk' }}>
            <div>
              <h1 style={{ color: 'black', paddingTop: '10px', marginLeft: '20px' }}> My Notes Application </h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'cornsilk', marginRight: '20px' }}>
              <div >
                <Button > <Link href="/">Home</Link>  </Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ backgroundColor: 'cornsilk', width: '100%', margin: '20px', borderRadius: '20px', paddingTop: '20px', paddingBottom: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>  User</h2>

            {login && login === false ? <p>login</p>  : <p>logout</p> } 
            {/* {data && data.map((note, i) => {       //คือจำนวนครั้งที่จะลูป
              let j = i + 1;   
              return (
                <div key={j} style={{ backgroundColor: '#FFE2D1', margin: '20px', borderRadius: '4px', padding: '10px' }}>

                  <p> id : {j}</p>
                  <p> idname : {note._id} </p>
                  <p> User : {note.username} </p>
                  <p> email : {note.email} </p>
                  <div style={{ float: 'right', display: 'flex', marginTop: -30, marginRight: 30 }}>
                      <EditUser posts={note._id} ></EditUser>
                      <button onClick={e => deleteUser(note._id)} style={{ marginLeft: 10, backgroundColor: 'red', border: "0.5px solid gray", color: "#FFF" }}>delete</button>
                    </div>
                 
                </div>
              )
            })} */}
          </div>
        </div>
      </div>

    </>
  )

}
export default index;