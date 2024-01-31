import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Wrapper } from "./auth-components";
import { Feed } from "./feed";


interface IFeed{
    id: string,
    feed: string,
    userId: string;
    userName: string;
    createdAt : number;
    photo?: string;
}

export const Timeline = () => {
    const [feeds, setFeeds] = useState<IFeed[]>([]);

    useEffect(()=>{
        fetchFeeds();
    })

    const fetchFeeds = async () => {
        const feedQuery = query(
            collection(db, "feeds"),
            orderBy("createdAt", "desc")
        )
        const snapshot = await getDocs(feedQuery);

        const feeds = snapshot.docs.map((doc) => {
            const {feed, userId, userName, createdAt, photo} = doc.data();

            return {
                id: doc.id,
                feed,
                userId,
                userName,
                createdAt,
                photo
            }
        })
        setFeeds(feeds);
    }
    return (
        <Wrapper>
          {feeds.map((feed) => (
            <Feed key={feed.id} feed={feed.feed} userName={feed.userName} photo={feed.photo}/>
          ))}
        </Wrapper>
      );
}