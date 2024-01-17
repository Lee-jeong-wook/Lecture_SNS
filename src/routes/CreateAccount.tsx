import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

import {
    Input,
    Title,
    Wrapper,
    Form,
    Error,
    Switcher
} from "../components/auth-components"
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import GithubButton from "../components/github.btn";

const CreateAccount = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navi = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 구조화
        const { 
            target: { name, value }
        } = e

        if (name === "name") {
            setName(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name === "" || email === "" || password === "") return;

        try {
            setIsLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(credentials.user, {
                displayName: name
            });
            navi("/");            
        } catch (error) {
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <Wrapper>
            <Title>Join</Title>
            <Form onSubmit={onSubmit}>
                <Input placeholder="name" type="text" name="name" onChange={handleChange} value={name} />
                <Input placeholder="id" type="text" name="email" onChange={handleChange} value={email} />
                <Input placeholder="pwd" type="password" name="password" onChange={handleChange} value={password} />

                <Input type="submit" value={isLoading ? "Loading..." : "Create"}/>
            </Form>
            <Switcher>
                Login - {""}
                <Link to="/login">로그인</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>
    )
}

export default CreateAccount