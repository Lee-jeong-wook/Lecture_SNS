import { useState } from "react";
import styled from "styled-components";

const ToastWrapper = styled.div`
    position: fixed;
    bottom: 12px;
    right: 12px;
    width: fit-content;
    min-height: 3rem;
    background-color: #fff;
    box-shadow: 5px 5px 5px lightgray;
    display: flex;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: opacity 0.3s ease-in-out;

    &.show{
        display: flex;
    }
   &.hide{
    display: none;
   } 
`
const ToastContent = styled.div`
    padding: 1.5rem;
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 100%;
`
interface ToastProps{
    isVisible?: boolean;
    children?: React.ReactNode;
}
export const Toast = ({ isVisible = true, children }:ToastProps) => {
    const [isShowing, setIsShowing] = useState(isVisible);
    <ToastWrapper className={isShowing ? "show" : "hide"}>
        <ToastContent>
            <div>{children}</div>
        </ToastContent>
    </ToastWrapper>
}