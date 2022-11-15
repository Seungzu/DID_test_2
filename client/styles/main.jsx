import styled from 'styled-components'

export const StyledMain = styled.div`
    margin : 0 auto;
    width : 800px;
    height: 100%;
    display: flex;
    justify-content: space-evenly;

    & > .menu {
        width : 200px;
        height: 300px;
        padding-top : 120px;
        padding-left: 70px;
        box-sizing: border-box;
        background-color: #dfb9b9;
        box-shadow: 8px 4px 20px 2px rgba(0,0,0,0.3);
        font-size: 30px;
        color: #e5683e;
        transition: all 300ms ease-in;
        cursor: pointer;

        :hover {
            width : 300px;
            height: 500px;
            padding-top : 220px;
            padding-left: 110px;
            box-sizing: border-box;
            background-color: #d18181;
            color: #7e371f;
        }

    }
`