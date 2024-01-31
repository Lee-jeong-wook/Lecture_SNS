import styled from "styled-components"

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
`

const Column = styled.div``

const Photo = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 12px;
`
const UserName = styled.span`
    font-weight: 500;
    font-size: 12px;
`

interface IFeed{
    feed: string;
    userName: string;
    photo?: string
}
export const Feed = ({feed, userName, photo}: IFeed) => {
    return(
        <Wrapper>
            <Column>
                <UserName>{userName}</UserName>
                <span>{feed}</span>
            </Column>
            {
                photo &&
                <Column>
                    <Photo src={photo}/>
                </Column>
            }
        </Wrapper>
    )
}