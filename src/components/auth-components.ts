//로그인 회원가입 폼에 공통으로 사용될 컴포넌트

import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`

export const Title = styled.h1`
    font-size: 14px;
`

export const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

export const Error = styled.span`
    font-weight: 600;
    color: tomato;
`

export const Input = styled.input`
    padding: 10px 20;
    border-radius: 50px;
    border: 1px solid #000;
    width: 100%;
    font-size:16px;
    &[type="submit"] {
        cursor: pointer;
        &:hover{
            opacity: 0.8;
        }
    }
`

export const Switcher = styled.span`
    margin-top: 20px;
    a {
        color: #1da425;
    }
`