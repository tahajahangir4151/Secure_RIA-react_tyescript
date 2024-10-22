import React, { useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import TableComponent from "../components/Table";
import PaginationComponent from "../components/Pagination";
import { targetData as initialData, TargetData } from "../data/targetData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TargetDialog from "../components/TargetDialog";

const Targets: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<TargetData[]>(initialData);
  const [editingTarget, setEditingTarget] = useState<TargetData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddClick = () => {
    setEditingTarget(null);
    setOpenDialog(true);
  };

  const handleEditClick = (target: TargetData) => {
    setEditingTarget(target); // Set the editing target
    setOpenDialog(true); // Open dialog
  };

  const handleDeleteClick = (targetId: number) => {
    setData(data.filter((target) => target.id !== targetId));
  };

  const handleDialogSubmit = (newTarget: TargetData) => {
    if (editingTarget) {
      // Update existing target
      setData(
        data.map((target) => (target.id === newTarget.id ? newTarget : target))
      );
    } else {
      // Add new target
      const newId = data.length ? Math.max(...data.map((t) => t.id)) + 1 : 1;
      setData([...data, { ...newTarget, id: newId }]);
    }
    setOpenDialog(false);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRowBackgroundColor = (index: number) => {
    return index % 2 === 0 ? "#E6F2FF" : "#FFFFFF";
  };

  const headers = ["Name", "Email", "Title", "Option"];

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component={"h4"}
              variant="h4"
              sx={{
                color: "#0473E9",
                fontWeight: "bold",
                fontSize: { xs: "24px", md: "30px" },
                fontFamily: "Nunito Sans",
              }}
            >
              Target
            </Typography>
            <Typography
              color="#000000"
              mt={"10px"}
              fontSize={{ xs: "12px", md: "14px" }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            sx={{
              backgroundColor: "#0473E9",
              color: "#FFFFFF",
              fontSize: "16px",
              padding: "5px 20px",
              borderRadius: "5px",
              height: "55px",
              "&:hover": {
                backgroundColor: "#005BB5",
              },
            }}
            onClick={handleAddClick}
          >
            Add Target
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <TableComponent
          data={data.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          headers={headers}
          getRowBackgroundColor={getRowBackgroundColor}
          renderActions={(row) => (
            <>
              <IconButton color="primary" onClick={() => handleEditClick(row)}>
                <EditIcon
                  sx={{ backgroundColor: "#0473E9", color: "#FFFFFF" }}
                />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => handleDeleteClick(row.id)}
              >
                <DeleteIcon
                  sx={{ backgroundColor: "#BE0505", color: "#FFFFFF" }}
                />
              </IconButton>
            </>
          )}
        />
        <PaginationComponent
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <TargetDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleDialogSubmit}
        initialData={editingTarget} // Pass data for editing
      />
    </>
  );
};

export default Targets;
