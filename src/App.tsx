import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // icon for dark mode
import Brightness7Icon from "@mui/icons-material/Brightness7"; // iccon for light mode
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskProgress from "./components/TaskProgress";
import TaskFilter from "./components/TaskFilter";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskFilter, setTaskFilter] = useState<"all" | "active" | "completed">("all");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  // Create dynamic theme based on mode
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === "light" ? "#3f51b5" : "#90caf9",
      },
      secondary: {
        main: themeMode === "light" ? "#f50057" : "#f48fb1",
      },
      background: {
        default: themeMode === "light" ? "#f5f5f5" : "#121212",
        paper: themeMode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            padding: "16px",
            boxShadow: themeMode === "light" ? "0 3px 10px rgba(0,0,0,0.08)" : "0 3px 10px rgba(0,0,0,0.2)",
          },
        },
      },
    },
  });

  function toggleTheme() {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  function handleCloseNotification() {
    setNotification({ ...notification, open: false });
  }

  function showNotification(message: string, severity: "success" | "info" | "warning" | "error" = "success") {
    setNotification({
      open: true,
      message,
      severity,
    });
  }

  function addTask(text: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    showNotification("Task added successfully!");
  }

  function toggleTaskCompletion(id: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const completed = !task.completed;
          showNotification(completed ? "Task completed!" : "Task marked as incomplete");
          return { ...task, completed };
        }
        return task;
      })
    );
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
    showNotification("Task deleted successfully!");
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          transition: "background 0.5s ease",
        }}
      >
        <AppBar position="static" elevation={0} sx={{ mb: 3 }}>
          <Toolbar>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                flexGrow: 1,
                fontWeight: 500,
                letterSpacing: "0.5px",
              }}
            >
              Task Manager App
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "rotate(30deg)",
                  },
                }}
                aria-label="toggle theme"
              >
                {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" sx={{ flex: "1 0 auto", pb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TaskForm onAddTask={addTask} />
            {/* Only display task filter when there are tasks */}
            {tasks.length > 0 && (
              <TaskFilter
                onFilterChange={setTaskFilter}
                activeFilter={taskFilter}
                completedCount={tasks.filter((t) => t.completed).length}
                activeCount={tasks.filter((t) => !t.completed).length}
              />
            )}
            {/* Filter tasks based on the selected filter */}
            <TaskList
              tasks={
                taskFilter === "all"
                  ? tasks
                  : taskFilter === "active"
                    ? tasks.filter((t) => !t.completed)
                    : tasks.filter((t) => t.completed)
              }
              onToggleCompletion={toggleTaskCompletion}
              onDeleteTask={deleteTask}
            />
            <TaskProgress tasks={tasks} />
          </Box>
        </Container>

        <Box component="footer" sx={{ py: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Task Manager &#8226; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", borderRadius: 2 }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
