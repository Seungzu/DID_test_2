import { useState, useEffect, createContext } from "react"
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Header from "../components/header"

export const Global = createContext({})

const MyApp = ({ Component, pageProps }) => {

  const [ userToken, setUserToken ] = useState('')
  const [ isLogin, setIsLogin ] = useState(false)
  const [ userData, setUserData ] = useState({})
  
  const [ cookies, setCookie, removeCookie ] = useCookies('');

  const globalState = {
    userToken,
    setUserToken,
    isLogin,
    setIsLogin,
    userData,
    setUserData
  }


  useEffect(()=>{
    if(userToken === '') return;
    (async () => {
      try {
        const response = await axios.post('http://localhost:5001/user/checkToken',{userToken})
        setIsLogin(true);
        // setUserData(response.data)
      } catch(e){
        console.log(e)
        setIsLogin(false)
        // removeCookie('Han_DID')
        // setUserToken('')
        alert('유효한 토큰이아닙니다 다시로그인하세요')
      }
    })()
    
  },[userToken])

  // useEffect(()=>{
  //   const { Han_DID : token } = cookies
  //   if (token) setUserToken(token);
  // },[])



  return (
    <>
      <Global.Provider value={globalState}>
        <Header />
        <Component {...pageProps} />
      </Global.Provider>
    </>
  )
}

export default MyApp
