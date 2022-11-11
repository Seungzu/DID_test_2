import { useState, useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router';

const Regist = () => {

  const [ userData, setUserData ] = useState({})

  const registUser = async (e) => {
    e.preventDefault()
    
    const response =  await axios.post('http://localhost:4000/user/regist',userData)
    if(response.data.regist){
      alert('회원가입 완료')
      Router.push('/user/login')
    } else {
      alert('회원가입 실패')
    }
  }

  const setValue = e => {
    const {name, value} = e.target
    const newUserInfo = {...userData, [name]:value }
    setUserData(newUserInfo)
  }

  useEffect(()=>{
    // console.log(userData)
  },[userData])


  return (
    <>
      <form action='회원가입' method="post" onSubmit={registUser}>
        아이디 : <input onChange={setValue} type='text' name='id' />
        <br />
        비밀번호 : <input onChange={setValue} type='text' name='pw' />
        <br />
        이름 : <input onChange={setValue} type='text' name='name' />
        <br />
        나이 : <input onChange={setValue} type='text' name='age' />
        <br />
        <input type='submit' value='가입' />
      </form>
      
    </>
    
  )
}

export default Regist