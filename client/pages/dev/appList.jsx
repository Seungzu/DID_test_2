import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Global } from '../_app';
import { useCookies } from 'react-cookie'
import Modal from '../../components/Modal';
import axios from 'axios';

const AppList = () => {

    const [ appList, setAppList ] = useState([])

    const {
        userToken,
        setUserToken,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
    } = useContext(Global)

    const viewApp = () => {
        return (
            <div>
                {appList.map((v,k)=>{
                    return (
                        <ul onClick={()=>{viewAppInfo(v.APIKey)}} key={k}>
                            <span>앱 이름</span><li>{v.name}</li>
                            <br />
                            <span>앱 사진</span><li>{v.imgUrl == null ? '이미지가 없습니다.' : v.imgUrl}</li>
                            <br />
                            <span>앱 설명</span><li>{v.description == null ? '앱 설명이 없습니다.' : v.description}</li>
                            <br />
                        </ul>
                    )
                })}
            </div>
        )
    }

    const viewAppInfo = APIKey => {
        Router.push({
            pathname : '/dev/appInfo',
            query: { APIKey }
        })
    }

    const addAppHandle = () => {
        Router.push('/dev/registApp')
    }

    useEffect(()=>{
        (async () => {
            if(!Object.keys(userData).length) return

            const response = await axios.post('http://localhost:4000/dev/viewAppList', userData)
            const { appList : viewAppList } = response.data
            setAppList(viewAppList)
        })()
    },[userData])

    return (
            <div>
                {viewApp()}
                <div onClick={addAppHandle}>App 추가하기</div>
            </div>
    )
}

export default AppList