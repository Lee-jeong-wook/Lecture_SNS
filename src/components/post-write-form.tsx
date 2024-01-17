import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";

// const Form
// const TextArea
// const SubmitBtn

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const TextArea = styled.textarea`
    border: 1px solid #000;
    padding: 17px;
    border-radius: 8px;
    font-size: 16px;
    width: 100%;
    color: #000;

    &::placeholder{
        font-size: 16px;
    }
`

const SubmitBtn = styled.input`
    background-color: #015bd6;
    color: #fff;
    padding: 10px 0;
    font-size: 16px;
    cursor: pointer;
`

const PostWriteForm =  () => {
    const [feed, setFeed] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeed(e.target.value);
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsLoading(true);

            const user = auth.currentUser;
            if(!user || feed === "") {
                return
            }
            try {
                await addDoc(collection(db, "feeds"),{
                    feed: feed,
                    createdAt: Date.now(),
                    userName: user.displayName || "human",
                    userId: user.uid
                })
            } catch (error) {
                console.log(error)
            } finally{
                setIsLoading(false);
            }
    }
    return(
        <Form onSubmit={onSubmit}>
            <TextArea placeholder="Write..." maxLength={100} value={feed} onChange={onChange}/>
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post"}/>
        </Form>
    )
}

export default PostWriteForm;