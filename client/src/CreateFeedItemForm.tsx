import { useState, SyntheticEvent, ChangeEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FeedItem } from "./App";
import { format } from "date-fns";

interface CreateFeedItemFormProps {
  onSuccess: () => void;
}

type CreateFeedItemFormValues = Omit<FeedItem, "id">;

const defaultValues: Partial<CreateFeedItemFormValues> = {
  content: "",
  event_date: "",
  followers: undefined,
  following: undefined,
  source: "",
  topic: "",
};

export const CreateFeedItemForm = ({ onSuccess }: CreateFeedItemFormProps) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors] =
    useState<Partial<CreateFeedItemFormValues>>(defaultValues);

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

    await fetch("http://localhost:5000/feed/create", {
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
      <form onSubmit={handleSubmit} id="create-feed-item-form">
        <DatePicker
          label="Event Date"
          onChange={(date: Date | null) => date && handleDateChange(date)}
        />
        <TextField
          error={Boolean(formErrors.followers)}
          id="followers-input"
          label="Number of Followers"
          name="followers"
          onChange={handleChange}
          required
          type="number"
        />
        <TextField
          error={Boolean(formErrors.following)}
          id="following-input"
          label="Number of People Following"
          name="following"
          onChange={handleChange}
          required
          type="number"
        />
        <TextField
          error={Boolean(formErrors.source)}
          id="event-date-input"
          label="Source"
          name="source"
          onChange={handleChange}
          required
          type="text"
        />
        <TextField
          error={Boolean(formErrors.topic)}
          id="event-date-input"
          label="Topic"
          name="topic"
          onChange={handleChange}
          required
          type="text"
        />
        <TextField
          error={Boolean(formErrors.content)}
          id="content-input"
          label="Content"
          multiline
          name="content"
          onChange={handleChange}
          required
          type="text"
        />
        <Button
          variant="contained"
          form="create-feed-item-form"
          type="submit"
          sx={{ m: 1 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
