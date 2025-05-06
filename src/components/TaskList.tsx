import { useState } from "react";
import { List, Paper, Typography, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Task } from "../App";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onToggleCompletion,
  onDeleteTask,
}: {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onDeleteTask: (id: string) => void;
}) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Display a message if there are no tasks
  if (tasks.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          gap: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        }}
        className="empty-state-container"
      >
        <AssignmentIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.6 }} />
        <Typography variant="h6" color="text.secondary" align="center">
          No tasks yet. Add a task to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <List sx={{ width: "100%", p: 0 }}>
        {tasks.map((task, index) => (
          <div
            tabIndex={0}
            style={{ outline: "none" }}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(-1)}
          >
            <TaskItem
              task={task}
              onToggleCompletion={onToggleCompletion}
              onDeleteTask={onDeleteTask}
              isFocused={focusedIndex === index}
            />
          </div>
        ))}
      </List>
    </Paper>
  );
}
