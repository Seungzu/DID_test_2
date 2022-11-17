import { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Router from 'next/router';
import { Global } from './_app';
import { StyledIndex } from '../styles';


const Home = () => {

  const {
    userToken,
    setUserToken,
    isLogin,
    setIsLogin,
    userData,
    setUserData
  } = useContext(Global)

  useEffect(()=>{
    if(isLogin) Router.push('/main')
  },[isLogin])

  return (
    <>
      <StyledIndex>
        <div>index페이지입니다.</div>
        <div>간단한 did소개 등등</div>
        <div>통합로그인을 위해 로그인 해주세요 등등</div>
      </StyledIndex>
    </>
  )
}

export default Home