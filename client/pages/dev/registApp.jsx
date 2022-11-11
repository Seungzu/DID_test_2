import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Global } from '../_app';
import { useCookies } from 'react-cookie'
import Modal from '../../components/Modal';
import axios from 'axios';

const RegistApp = () => {

    const [ appInfo, setAppInfo ] = useState({})

    const {
        userToken,
        setUserToken,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
    } = useContext(Global)



    const handleChange = (e) => {
        const { name, value } = e.target
        setAppInfo({...appInfo, [name]:value, userData})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:4000/dev/addApp', appInfo)
        console.log(response.data)
    }

    useEffect(()=>{
        // console.log(appInfo)
    },[appInfo])

    return (
        <>
            <form onSubmit={handleSubmit} action="registApp" method="post">
                <ul>
                    <li>
                        app이름 : <input onChange={handleChange} type="text" name="appName" placeholder="app name 입력하세요" />

                    </li>
                    <li>
                        app 설명 : <input onChange={handleChange} type="text" name="appDesc" placeholder="app Desc 입력하세요" />

                    </li>
                    <li>
                        app 로고 : <input onChange={handleChange} type="text" name="appLogo" placeholder="app Logo 입력하세요" />

                    </li>
                    <li>
                        host : <input onChange={handleChange} type="text" name="appHost" placeholder="app Host 입력하세요" />

                    </li>
                    <li>
                        redirectUri : <input onChange={handleChange} type="text" name="appRedirectUri" placeholder="app RedirectUri 입력하세요" />
                    </li>
                    <li>
                        <input type='submit' value='등록' />
                    </li>
                </ul>
            </form>
        </>
    )
}

export default RegistApp