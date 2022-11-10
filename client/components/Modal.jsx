import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Global } from '../pages/_app'
import axios from 'axios';
import { useCookies } from 'react-cookie'

const Modal = ({modal}) => {

    const [ modalSwitch, setModalSwitch ] = useState('block')
    const [ pwMsg, setPwMsg ] = useState('비밀번호를 입력해주세요')

    const [ cookies, setCookie, removeCookie ] = useCookies('');


    const {
        userToken,
        setUserToken,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
    } = useContext(Global)

    const pwChangeHandler = (e) => {
        e.preventDefault()
        modal.setUserPw(e.target.value)
    }

    return (
        <div style={{
                    display: modalSwitch,
                    position:'absolute',
                    width:'100%',
                    height:'100%',
                    background : 'rgba(0, 0, 0, 0.4)',
                    top:0,
                    left:0,
        }}>
            <div style={{
                margin:'300px 0 0 300px'
            }}>
                <div>
                    모달이에요
                </div>
                <div>
                    {pwMsg}
                </div>
                <form action="pwCheck" method="post">
                    <input onChange={pwChangeHandler} type='password' name="pw" />
                    <input onClick={modal.submit} type='submit' value='확인'/>
                    <button onClick={modal.cancle} >취소</button>
                </form>
            </div>
            
        </div>
    )
}

export default Modal