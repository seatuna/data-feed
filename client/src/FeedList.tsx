import { FeedItem } from "./App";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { EditFeedItemForm } from "./EditFeedItemForm";

interface FeedListProps {
  feed: FeedItem[];
  refreshData: () => void;
}

export const FeedList = ({ feed, refreshData }: FeedListProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeedItem>();

  const deleteItem = async (id: number) => {
    await fetch(`http://localhost:5000/feed/${id}/delete`, {
      method: "delete",
      mode: "cors",
    });
    refreshData();
  };

  return (
    <>
      <Dialog open={isEditMode} onClose={() => setIsEditMode(false)}>
        {selectedItem && (
          <EditFeedItemForm
            feedItem={selectedItem}
            onSuccess={() => {
              refreshData();
              setIsEditMode(false);
            }}
            onClose={() => setIsEditMode(false)}
          />
        )}
      </Dialog>
      {feed.map((feedItem) => (
        <Card
          sx={{ maxWidth: 345, borderRadius: 0, border: "1px solid" }}
          key={feedItem.id}
        >
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              marginBottom={2}
              textAlign="right"
            >
              {format(Date.parse(feedItem.event_date), "yyyy-MM-dd HH:mm")}
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom={2}>
              {feedItem.content}
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom={2}>
              Source: {feedItem.source}
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom={2}>
              Followers: {feedItem.followers}, Following: {feedItem.following}
            </Typography>
            <Chip
              label={feedItem.topic}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "#2a3eb1", color: "white" }}
            />
          </CardContent>
          <CardActions sx={{ justifyItems: "flex-end" }}>
            <Button
              size="small"
              onClick={() => {
                setIsEditMode(true);
                setSelectedItem(feedItem);
              }}
            >
              Edit
            </Button>
            <Button size="small" onClick={() => deleteItem(feedItem.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};
