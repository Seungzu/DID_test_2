import Router from 'next/router';

const AppList = () => {

    const addAppHandle = () => {
        Router.push('/dev/registApp')
    }

    return (
        <>
            <div>
                <div>App list 페이지</div>
                <div onClick={addAppHandle}>App 추가하기</div>
            </div>
        </>
    )
}

export default AppList