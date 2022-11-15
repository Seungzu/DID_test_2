import { useState, useEffect, useContext } from 'react'
import { StyledModal } from '../styles/modal';

const Modal = ({modal}) => {

    const [ modalSwitch, setModalSwitch ] = useState('block')
    const [ pwMsg, setPwMsg ] = useState('비밀번호를 입력해주세요')


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
                    margin : '0 auto',
                    background : 'rgba(0, 0, 0, 0.4)',
                    top:0,
                    left:0,
        }}>
            <div style={{
                margin:'300px 0 0 300px'
            }}>
                <StyledModal>
                    <div className='msg'>
                        {pwMsg}
                    </div>
                    <form action="pwCheck" method="post">
                        <input className='pw' onChange={pwChangeHandler} type='password' name="pw" />
                        <input className='submit' onClick={modal.submit} type='submit' value='확인'/>
                        <button className='cancel' onClick={modal.cancle} >취소</button>
                    </form>
                </StyledModal>
            </div>
        </div>
    )
}

export default Modal