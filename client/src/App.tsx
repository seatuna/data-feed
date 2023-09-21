import "./App.css";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FeedList } from "./FeedList";
import { CreateFeedItemForm } from "./CreateFeedItemForm";

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

  const createSuccess = (feedItem: FeedItem) => {
    setFeedData((prev) => (prev ? [...prev, feedItem] : [feedItem]));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CreateFeedItemForm onSuccess={createSuccess} />
      {feedData && feedData.length > 0 && <FeedList feed={feedData} />}
    </LocalizationProvider>
  );
}

export default App;
