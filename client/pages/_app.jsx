import Header from '../components/header'
import { useState, useEffect, createContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { StyledGlobal } from '../styles/global';


export const Global = createContext({});

function MyApp({ Component, pageProps }) {

  const [ userToken, setUserToken ] = useState('')
  const [ isLogin, setIsLogin ] = useState(false)
  const [ userData, setUserData ] = useState({})

  const [ cookies, setCookie, removeCookie ] = useCookies('');

  const globalstate = {
    userToken,
    setUserToken,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
  }

  useEffect(()=>{
    if(userToken === '') return;
    (async () => {
      try {
        const response = await axios.post('http://localhost:4000/user/checkToken',{userToken})
        setIsLogin(true);
        setUserData(response.data)
      } catch(e){
        console.log(e)
        setIsLogin(false)
        removeCookie('Han_DID')
        setUserToken('')
        alert('유효한 토큰이아닙니다 다시로그인하세요')
      }
    })()
    
  },[userToken])

  useEffect(()=>{
    const { Han_DID : token } = cookies
    if (token) setUserToken(token);
  },[])


    return (
      <>
        <StyledGlobal>
          <Global.Provider value={globalstate}>
            <Header />
            <Component {...pageProps} />
          </Global.Provider>
        </StyledGlobal>
      </>
    )
}

export default MyApp
