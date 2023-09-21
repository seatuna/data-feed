import { useState, SyntheticEvent, ChangeEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FeedItem } from "./App";
import { format } from "date-fns";

interface EditFeedItemFormProps {
  feedItem: FeedItem;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditFeedItemForm = ({
  feedItem,
  onClose,
  onSuccess,
}: EditFeedItemFormProps) => {
  const [formValues, setFormValues] = useState(feedItem);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formField = e.target.name;
    const value = e.target.value;
    setFormValues((prev) => ({
      ...prev,
      [formField]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setFormValues((prev) => ({
      ...prev,
      event_date: format(date, "yyyy-MM-dd HH:mm"),
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/feed/${feedItem.id}/edit`, {
      method: "post",
      mode: "cors",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });
    onSuccess();
  };

  return (
    <Box
      sx={{
        margin: "10px 15px 30px",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <form onSubmit={handleSubmit} id="edit-feed-item-form">
        <DatePicker
          // defaultValue={parseISO(feedItem.event_date)}
          label="Event Date"
          onChange={(date: Date | null) => date && handleDateChange(date)}
        />
        <TextField
          defaultValue={feedItem.followers}
          id="followers-input"
          label="Number of Followers"
          name="followers"
          onChange={handleChange}
          required
          type="number"
        />
        <TextField
          defaultValue={feedItem.following}
          id="following-input"
          label="Number of People Following"
          name="following"
          onChange={handleChange}
          required
          type="number"
        />
        <TextField
          defaultValue={feedItem.source}
          id="event-date-input"
          label="Source"
          name="source"
          onChange={handleChange}
          required
          type="text"
        />
        <TextField
          defaultValue={feedItem.topic}
          id="event-date-input"
          label="Topic"
          name="topic"
          onChange={handleChange}
          required
          type="text"
        />
        <TextField
          defaultValue={feedItem.content}
          id="content-input"
          label="Content"
          multiline
          rows={4}
          name="content"
          onChange={handleChange}
          required
          type="text"
        />
        <Button
          variant="contained"
          form="edit-feed-item-form"
          type="submit"
          sx={{ m: 1 }}
        >
          Update
        </Button>
        <Button variant="contained" onClick={onClose} sx={{ m: 1 }}>
          Close
        </Button>
      </form>
    </Box>
  );
};
