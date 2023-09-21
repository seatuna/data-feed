import "./App.css";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FeedList } from "./FeedList";
import { CreateFeedItemForm } from "./CreateFeedItemForm";
import { Button, Dialog } from "@mui/material";

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getFeedData = async () => {
    const feed = await fetch("http://localhost:5000/feed", {
      method: "GET",
    });
    const feedJson = await feed.json();
    setFeedData(feedJson);
  };

  useEffect(() => {
    getFeedData();
  }, []);

  const refreshData = () => {
    getFeedData();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <CreateFeedItemForm
          onSuccess={() => {
            refreshData();
            setIsCreateModalOpen(false);
          }}
        />
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsCreateModalOpen(true);
        }}
        sx={{ marginBottom: "15px" }}
      >
        Create
      </Button>
      {feedData && feedData.length > 0 && (
        <FeedList feed={feedData} refreshData={refreshData} />
      )}
    </LocalizationProvider>
  );
}

export default App;
