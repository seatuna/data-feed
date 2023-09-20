import { FeedItem } from "./App";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

interface FeedListProps {
  feed: FeedItem[];
}

export const FeedList = ({ feed }: FeedListProps) => {
  return (
    <>
      {feed.map((feedItem) => (
        <Card
          sx={{ maxWidth: 345, borderRadius: 0, border: "1px solid" }}
          key={feedItem.id}
        >
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {feedItem.content}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={feedItem.topic}
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "blue", color: "white" }}
              />
              <Chip
                label={feedItem.source}
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "orange", color: "white" }}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
            <Button size="small">Delete</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};
