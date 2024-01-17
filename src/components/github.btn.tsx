import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

const Button = styled.span`
    margin-top: 50px;
    background-color: #000;
    width: 100%;
    color: #fff;
    border-radius: 50px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const GithubButton = () => {
    const navi = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navi("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button onClick={onClick}>
            Continue with github
        </Button>
    )
}

export default GithubButton;
