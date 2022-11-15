import styled from 'styled-components'

export const StyledModal = styled.form`
        width : 300px;
        height: 150px;
        border: 2px solid black;
        padding : 20px;
        box-sizing: border-box;
        background-color: #c3c9b7;

        & > .msg {
            font-weight: 600;
            padding-top : 10px;
            margin-bottom: 10px;
        }

        & > form > .pw {
            border: none;
        }

        & > form > .submit {
            color : blue;
            margin-left:170px;
        }

        & > form > .cancel {
            color : red;
       }
`