import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Global } from '../pages/_app';
import { useCookies } from 'react-cookie'

const Header = () => {

    const [ cookies, setCookie, removeCookie ] = useCookies('');

    const {
        userToken,
        setUserToken,
        isLogin,
        setIsLogin,
        userData,
        setUserData
    } = useContext(Global)


    const logout = async () => {
        console.log('로그아웃')
        // removeCookie('Han_DID')
        // setUserToken('')
        // setIsLogin(false)
        // setUserData({})
        // alert('로그아웃 되었습니다.')
        // Router.push('/')
    }

    return (
        <div>
            <div>Header layout</div>
            <Link href='/'>Logo</Link>
            <br/>
            {isLogin ? (
                <>
                    <span onClick={logout}>로그아웃</span>
                </>
            ) : (
                <>
                    <Link href='http://localhost:3000/user/login'>DID 통합 로그인</Link>
                    {/* <br/>
                    <Link href="/user/regist">regist</Link>
                    <br/> */}
                </>
            )}
            
            
            
        </div>
    )
}

export default Header