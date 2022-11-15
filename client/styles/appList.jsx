import styled from 'styled-components'

export const StyledAppList = styled.div`
    width : 800px;
    display: flex;
    justify-content: space-evenly;
    background-color: #b4cfcf;
    margin : 0 auto ;
`

export const StyledAppBox = styled.ul`
    width : 100px;
    height: 100px;
    border: 2px solid black;
    padding : 30px;
    margin : 0px;

    & > .img {
        width : 100px;
        height: 50px;
    }
    & > .name {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 12px;
        color : black ;
    }
    & > .desc {
        color : #ba8362;
        font-size: 14px;
        margin-bottom: 20px;
    }
`

export const StyledAddApp = styled.div`
    width : 130px;
    height: 100px;
    margin-top: 30px;
    padding-top : 40px;
    padding-left: 20px;
    font-size: 14px;
    font-weight: 700;
    border: 2px solid black;
    box-sizing: border-box;
    background-color: #deccb1;
`