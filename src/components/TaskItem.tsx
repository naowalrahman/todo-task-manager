import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Divider,
  Box,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Task } from "../App";

export default function TaskItem({
  task,
  onToggleCompletion,
  onDeleteTask,
  isFocused = false,
}: {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onDeleteTask: (id: string) => void;
  isFocused?: boolean;
}) {
  return (
    <Box sx={{ position: "relative" }}>
      <ListItem
        sx={{
          borderLeft: task.completed ? "4px solid" : "none",
          borderColor: "success.main",
          bgcolor: isFocused ? "action.selected" : task.completed ? "action.hover" : "transparent",
          transition: "all 0.3s ease",
          animation: "fadeIn 0.4s ease-in",
        }}
        secondaryAction={
          <Tooltip title="Delete task">
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDeleteTask(task.id)}
              sx={{
                color: "error.main",
                opacity: 0.7,
                "&:hover": {
                  opacity: 1,
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }
      >
        <ListItemButton
          onClick={() => onToggleCompletion(task.id)}
          dense
          sx={{
            borderRadius: 1,
            transition: "background-color 0.2s",
          }}
        >
          <ListItemIcon>
            <Tooltip title={task.completed ? "Mark as incomplete" : "Mark as complete"}>
              <Checkbox
                edge="start"
                checked={task.completed}
                tabIndex={-1}
                disableRipple
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon color="success" />}
                slotProps={{ input: { "aria-labelledby": `checkbox-list-label-${task.id}` } }}
                sx={{
                  "&:hover": { transform: "scale(1.1)" },
                  transition: "transform 0.2s",
                }}
              />
            </Tooltip>
          </ListItemIcon>
          <ListItemText
            id={`checkbox-list-label-${task.id}`}
            primary={task.text}
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "text.secondary" : "text.primary",
            }}
          />
        </ListItemButton>
      </ListItem>
      <Divider component="li" sx={{ opacity: 0.6 }} />
    </Box>
  );
}
