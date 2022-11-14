import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Global } from '../_app';
import { useCookies } from 'react-cookie'
import axios from 'axios';

const ConnectedApp = () => {

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
                        <ul key={k} >
                            <span>앱 이름</span><li>{v.name}</li>
                            <span>앱 설명</span><li>{v.description}</li>
                            <span>앱 이미지</span><li>{v.imgUrl}</li>
                            <br />
                        </ul>
                    )
                })}
            </div>
        )
    }




    useEffect(()=>{
        
        (async ()=>{
            if(!Object.keys(userData).length) return
            const response = await axios.post('http://localhost:4000/user/viewAppList', userData)
            setAppList(response.data.result)
        })()
    },[userData])




    if(!appList.length) return

    return (
            <div>
                {viewApp()}
            </div>
    )
}

export default ConnectedApp