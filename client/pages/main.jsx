import { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Router from 'next/router';
import { Global } from './_app';
import { StyledMain } from '../styles/main';

const Main = () => {

    const user = () => {
        Router.push('/user/connectedApp');
    }

    const dev = () => {
        Router.push('/dev/appList');
    }


    const {
        userToken,
        setUserToken,
        isLogin,
        setIsLogin,
        userData,
        setUserData
    } = useContext(Global)


    return (
        <>
            <StyledMain>
                <div className='menu' onClick={user}>
                    user
                </div>
                <div className='menu' onClick={dev}>
                    dev
                </div>
            </StyledMain>
        </>
    )
}

export default Main