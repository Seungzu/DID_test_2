import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Global } from '../_app';
import { useCookies } from 'react-cookie'
import Modal from '../../components/Modal';
import axios from 'axios';

const MyProfile = () => {

    const [ infoPwCheck, setInfoPwCheck ] = useState(false)
    const [ rejoinPwCheck, setRejoinPwCheck ] = useState(true)
    const [ deletePwCheck, setDeletePwCheck ] = useState(true)
    const [ userPw, setUserPw ] = useState('')
    const [ modal, setModal ] = useState(true)
    const [ userInfo, setUserInfo ] = useState({})
    const [ cookies, setCookie, removeCookie ] = useCookies('');

    const {
        userToken,
        setUserToken,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
    } = useContext(Global)

    const infoCheckSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:4000/user/pwCheck',{userPw,cookies})
            if(response.data.pwCheck){
                setInfoPwCheck(true)
                const showInfo = await axios.post('http://localhost:4000/user/getUserInfo', { hash:response.data.hash })
                setUserInfo(showInfo.data.userInfo)
            } else {
                alert('비번 틀렸어요.')
                setInfoPwCheck(false)
            }
        } catch(e){
            console.log(e)
        }
    }

    const infoCheckCancle = (e) => {
        e.preventDefault();
        setInfoPwCheck(false)
        Router.push('/')
    }

    const rejoinCheckSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:4000/user/pwCheck',{userPw,cookies})
            if(response.data.pwCheck){
                setRejoinPwCheck(true)
                const withdrawUser = await axios.post('http://localhost:4000/user/withdrawUser',{hash:response.data.hash})
                if(withdrawUser.data.withdraw){
                    alert('재등록을 진행합니다.')
                    removeCookie("Han_DID")
                    setIsLogin(false)
                    Router.push('/user/regist');
                } else {
                    alert('재등록 에러입니다.')
                }
            } else {
                alert('비번 틀렸습니다.')
            }
        } catch(e){
            console.log(e)
        }
    }

    const rejoinCheckCancle = (e) => {
        e.preventDefault();
        setRejoinPwCheck(true)
    }

    const deleteCheckSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:4000/user/pwCheck',{userPw,cookies})
            if(response.data.pwCheck){
                setRejoinPwCheck(true)
                const withdrawUser = await axios.post('http://localhost:4000/user/withdrawUser',{hash:response.data.hash})
                if(withdrawUser.data.withdraw){
                    alert('회원탈퇴 되었어요....어디가세요')
                    removeCookie("Han_DID")
                    setIsLogin(false)
                    Router.push('/');
                } else {
                    alert('회원탈퇴 에러입니다..')
                }
            } else {
                alert('비번 틀렸습니다.')
            }
        } catch(e){
            console.log(e)
        }
    }

    const deleteCheckCancle = (e) => {
        e.preventDefault();
        setDeletePwCheck(true)
    }

    const rejoinHandle = (e) => {
        e.preventDefault();
        setRejoinPwCheck(false)
    }

    const deleteHandle = (e) => {
        e.preventDefault();
        setDeletePwCheck(false)
    }

    useEffect(()=>{
        // console.log('asdgasdgewg',userPw)
    }, [ userInfo, infoPwCheck, userPw ])

    return (
        <>
            <div>
                <div>
                    마이프로필
                </div>
                아이디 : <input type='text' value={infoPwCheck ? userInfo.id : '' }/>
                <br />
                이름 : <input type='text' value={infoPwCheck ? userInfo.name : '' } />
                <br />
                나이 : <input type='text' value={infoPwCheck ? userInfo.age : '' } />
                <br />
                <button onClick={rejoinHandle}>재등록</button>
                <br />
                <button onClick={deleteHandle}>회원탈퇴</button>
            </div>
            { infoPwCheck ? (
                    ('')
                ) : <Modal
                        modal={{
                            submit:infoCheckSubmit,
                            cancle:infoCheckCancle,
                            setUserPw
                    }} />
            }

            { rejoinPwCheck ? (
                ('')
            ) : (
                <Modal
                        modal={{
                            submit:rejoinCheckSubmit,
                            cancle:rejoinCheckCancle,
                            setUserPw
                    }} />
            )}

            { deletePwCheck ? (
                ('')
            ) : (
                <Modal
                        modal={{
                            submit:deleteCheckSubmit,
                            cancle:deleteCheckCancle,
                            setUserPw
                    }} />
            )}
        </>
    )
}

export default MyProfile