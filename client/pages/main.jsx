import { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Router from 'next/router';
import { Global } from './_app';

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
            <div onClick={user}>
                user
            </div>
            <div onClick={dev}>
                dev
            </div>
        </>
    )
}

export default Main