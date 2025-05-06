import { Box, LinearProgress, Typography, Chip, Fade } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Task } from "../App";

export default function TaskProgress({ tasks }: { tasks: Task[] }) {
  // If there are no tasks, don't render anything
  if (tasks.length === 0) return null;

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  // Get color gradient based on progress
  const getProgressColor = () => {
    if (progress < 30) return "linear-gradient(to right, #f44336, #ff9800)";
    if (progress < 70) return "linear-gradient(to right, #ff9800, #2196f3)";
    return "linear-gradient(to right, #4caf50, #8bc34a)";
  };

  return (
    <Box
      sx={{
        mt: 3,
        px: 2,
        py: 2,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" fontWeight="medium">
            Progress
          </Typography>
          <Chip
            label={`${Math.round(progress)}%`}
            size="small"
            color={progress === 100 ? "success" : "primary"}
            sx={{
              height: 20,
              fontSize: "0.7rem",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <CheckCircleOutlineIcon fontSize="small" color="action" />
          <Typography variant="body2" fontWeight="medium">
            {completedTasks} of {tasks.length}
          </Typography>
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 5,
          bgcolor: "rgba(0,0,0,0.05)",
          ".MuiLinearProgress-bar": {
            borderRadius: 5,
            backgroundImage: getProgressColor(),
            transition: "transform 0.5s ease, background-image 0.5s ease",
          },
        }}
      />

      {progress === 100 && (
        <Fade in={true} timeout={800}>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <EmojiEventsIcon color="success" />
            <Typography variant="body2" color="success.main" fontWeight="medium">
              All tasks completed!
            </Typography>
          </Box>
        </Fade>
      )}
    </Box>
  );
}
