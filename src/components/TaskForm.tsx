import { useState } from "react";
import { TextField, Button, Box, Paper, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TaskForm({ onAddTask }: { onAddTask: (text: string) => void }) {
  const [taskText, setTaskText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAddTask(taskText);
    setTaskText(""); // Reset the input field after task is added
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        p: 2,
        backgroundColor: "background.paper",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          position: "relative",
        }}
      >
        <TextField
          fullWidth
          label="Add a new task"
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          variant="outlined"
          placeholder="What needs to be done?"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              pr: 1,
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!taskText.trim()}
                    sx={{
                      borderRadius: 4,
                      px: 2,
                      fontWeight: "bold",
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: 2,
                      },
                    }}
                    startIcon={<AddIcon />}
                  >
                    Add Task
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Paper>
  );
}
