import "./App.css";
import { useEffect, useState } from "react";
import { FeedList } from "./FeedList";

export interface FeedItem {
  id: number;
  content: string;
  event_date: string;
  followers: number;
  following: number;
  source: string;
  topic: string;
}

function App() {
  const [feedData, setFeedData] = useState<FeedItem[] | undefined>();

  useEffect(() => {
    const getFeedData = async () => {
      const feed = await fetch("http://localhost:5000/feed", {
        method: "GET",
      });
      const feedJson = await feed.json();
      console.log(feedJson);
      setFeedData(feedJson);
    };
    getFeedData();
  }, []);

  return <>{feedData && feedData.length > 0 && <FeedList feed={feedData} />}</>;
}

export default App;
