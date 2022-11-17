import { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Router from 'next/router';
import { Global } from '../_app';
import { StyledLogin } from '../../styles/login';

const Login = () => {
    const [ cookies, setCookie, removeCookie ] = useCookies('');
    const [ loginInfo, setLoginInfo ] = useState({})

    
    const {
        userToken,
        setUserToken,
        isLogin,
        setIsLogin,
        userData,
        setUserData
    } = useContext(Global)

    const setValue = e => {
        const { value, name } = e.target
        setLoginInfo({...loginInfo, [name]:value})
    }

    const loginHandler = async (e) => {
        e.preventDefault()

        const response = await axios.post('http://localhost:4000/user/login',loginInfo)
        const token = response.data.token
        try{
            if(response.data.login){
                setUserToken(token)
                setCookie('Han_DID', token)
                alert('로그인 성공')
                Router.push('/')
            } else {
                alert('로그인 실패')
            }
        } catch(e){
            console.log(e)
            alert('로그인 에러')
        }
    }

    useEffect(()=>{
        // console.log(isLogin)
    },[isLogin])


    if(isLogin){
        alert('이미 로그인되어있습니다.')
        Router.push('/main')
    }



    return (
        <>
            <StyledLogin>
                <div>로그인 페이지입니다.</div>
                <form onSubmit={loginHandler} action='로그인' method='post'>
                    아이디 : <input onChange={setValue} type='text' name='id' />
                    <br />
                    비밀번호 : <input onChange={setValue} type='password' name='pw' />
                    <input type='submit' value='로그인' />
                </form>
            </StyledLogin>
        </>
    )
}

export default Login