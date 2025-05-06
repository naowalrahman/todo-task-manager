import { Box, ButtonGroup, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

type FilterType = "all" | "active" | "completed";

export default function TaskFilter({
  onFilterChange,
  activeFilter,
  completedCount,
  activeCount,
}: {
  onFilterChange: (filter: FilterType) => void;
  activeFilter: FilterType;
  completedCount: number;
  activeCount: number;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        mb: 1,
      }}
    >
      <ButtonGroup variant="outlined" size="small" aria-label="task filter" sx={{ borderRadius: 2 }}>
        <Button
          onClick={() => onFilterChange("all")}
          variant={activeFilter === "all" ? "contained" : "outlined"}
          startIcon={<FilterListIcon fontSize="small" />}
        >
          All ({activeCount + completedCount})
        </Button>
        <Button
          onClick={() => onFilterChange("active")}
          variant={activeFilter === "active" ? "contained" : "outlined"}
          disabled={activeCount === 0}
        >
          Active ({activeCount})
        </Button>
        <Button
          onClick={() => onFilterChange("completed")}
          variant={activeFilter === "completed" ? "contained" : "outlined"}
          disabled={completedCount === 0}
        >
          Completed ({completedCount})
        </Button>
      </ButtonGroup>
    </Box>
  );
}
