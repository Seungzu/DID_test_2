import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Global } from '../_app';
import { useCookies } from 'react-cookie'
import Modal from '../../components/Modal';
import axios from 'axios';
import { StyledAppList, StyledAppBox, StyledAddApp } from '../../styles/appList';

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
            <StyledAppList>
                {appList.map((v,k)=>{
                    return (
                        <StyledAppBox onClick={()=>{viewAppInfo(v.APIKey)}} key={k}>
                            <li className='img'>{v.imgUrl == null ? '이미지가 없습니다.' : v.imgUrl}</li>
                            <li className='name'>{v.name}</li>
                            <li className='desc'>{v.description == null ? '앱 설명이 없습니다.' : v.description}</li>
                            <br />
                        </StyledAppBox>
                    )
                })}
                <StyledAddApp onClick={addAppHandle}>
                    App 추가하기
                </StyledAddApp>
            </StyledAppList>
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
                
            </div>
    )
}

export default AppList