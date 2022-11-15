import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Global } from '../_app';
import { useCookies } from 'react-cookie'
import axios from 'axios';


const AppInfo = () => {

    const [ AppInfo, setAppInfo ] = useState({})


    const {
        userToken,
        setUserToken,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
    } = useContext(Global)


    const deleteHandle = async (e) => {
        e.preventDefault()

        const response = await axios.post('http://localhost:4000/dev/deleteApp', AppInfo)

        if(response.data.delete){
            alert('앱이 삭제되었습니다.')
            Router.push('/dev/appList')
        } else {
            alert('앱 삭제 실패')
            Router.push('/dev/appInfo')
        }
    }

    useEffect(()=>{
        (async ()=>{
            const APIKey = window.location.search.split('=')[1]
            const response = await axios.post('http://localhost:4000/dev/viewAppInfo', { APIKey })
            const { viewAppInfo, result } = response.data
            if(viewAppInfo){
                setAppInfo(result)
            } else {
                alert('유저정보 불러오기 실패')               
            }
        })()
        
    },[])

    return (
        <>
            <div>
                <form onSubmit={deleteHandle} action='appInfo' method='post' >
                    <span>앱 이름</span><input type='text' readOnly value={AppInfo.name || ''} />
                    <br />
                    <span>앱 설명</span><input type='text' readOnly placeholder={AppInfo.description==null ? '설명이 없습니다.' : ''} value={AppInfo.description || ''} />
                    <br />
                    <span>앱 이미지</span><input type='text' readOnly placeholder={AppInfo.description==null ? '사진이 없습니다.' : ''} value={AppInfo.name || ''} />
                    <br />
                    <span>host</span><input type='text' readOnly value={AppInfo.host || ''} />
                    <br />
                    <span>redirectUri</span><input type='text' readOnly value={AppInfo.redirectURI || ''} />
                    <br />
                    <input type='submit' value='앱 삭제' />
                </form>
            </div>
        </>
    )
}

export default AppInfo