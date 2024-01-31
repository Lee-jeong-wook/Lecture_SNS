import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;


const PostWriteForm =  () => {
    const [feed, setFeed] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeed(e.target.value);
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(files && files.length === 1)
        setFile(files[0]);
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const user = auth.currentUser;
            if(!user || feed === "") {
                return
            }
            try {
                setIsLoading(true);
                const doc = await addDoc(collection(db, "feeds"),{
                    feed: feed,
                    createdAt: Date.now(),
                    userName: user.displayName || "human",
                    userId: user.uid
                })


                if(file){
                    const locationRef = ref(
                        storage,
                        `feeds/${user.uid}-${user.displayName}/${doc.id}`
                    )
                    const result = await uploadBytes(locationRef, file);
                    const url = await getDownloadURL(result.ref)

                    await updateDoc(doc, {
                        photo: url
                    })
                }
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
            <AttachFileButton htmlFor="file">
                {file ? "Photo added" : "Add photo"}
            </AttachFileButton>

            <AttachFileInput
                onChange={onFileChange}
                type="file"
                id="file"
                accept="image/*"
            />
        </Form>
    )
}

export default PostWriteForm;