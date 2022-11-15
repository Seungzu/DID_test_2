import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Global } from '../pages/_app';
import { useCookies } from 'react-cookie'
import { StyledHeader, Nav } from '../styles/header';

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
        removeCookie('Han_DID')
        setUserToken('')
        setIsLogin(false)
        setUserData({})
        alert('로그아웃 되었습니다.')
        Router.push('/')
    }

    return (
        <StyledHeader>
            <Link href='/'>Logo</Link>
            <br/>
            {isLogin ? (
                <Nav>
                    <Link href='/user/myProfile'>프로필보기</Link>
                    <div onClick={logout}>로그아웃</div>
                </Nav>
            ) : (
                <Nav>
                    <Link href='/user/login'>login</Link>
                    <br/>
                    <Link href="/user/regist">regist</Link>
                    <br/>
                </Nav>
            )}
            
            
            
        </StyledHeader>
    )
}

export default Header