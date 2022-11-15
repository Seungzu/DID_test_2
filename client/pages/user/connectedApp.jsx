import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Global } from '../_app';
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { StyledAppList, StyledAppBox, StyledAddApp } from '../../styles/appList';

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

    const handleClick = (host) => {
        window.open(`${host}`)
    }

    const viewApp = () => {
        return (
            <StyledAppList>
                {appList.map((v,k)=>{
                    return (
                        <StyledAppBox onClick={()=>{handleClick(v.host)}} key={k} >
                            <li className='img'>{v.imgUrl}</li>
                            <li className='name'>{v.name}</li>
                            <li className='desc'>{v.description}</li>
                            <br />
                        </StyledAppBox>
                    )
                })}
            </StyledAppList>
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