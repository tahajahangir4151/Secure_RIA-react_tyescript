import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
   Typography,
} from "@mui/material";
import { compaignData } from "../data/compaignData";
import TableComponent from "../components/Table";
import PaginationComponent from "../components/Pagination";

const Home: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Pagination Logic
  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle Number of rows change per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  // Function to dynamically set row background colors
  const getRowBackgroundColor = (index: number) => {
    return index % 2 === 0 ? "#E6F2FF" : "#FFFFFF";
  };

  const headers = [
    "Sent Date",
    "Name",
    "Open",
    "Internal Clicks",
    "Time Opened",
  ];

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
                fontSize: { xs: "24px", md: "30px" }, // Responsive font size
                fontFamily: "Nunito Sans",
              }}
            >
              Campaigns Running
            </Typography>
            <Typography
              color="#000000"
              mt={"10px"}
              fontSize={{ xs: "12px", md: "14px" }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
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
          >
            Create New Email
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <TableComponent
          data={compaignData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          headers={headers}
          getRowBackgroundColor={getRowBackgroundColor}
        />
        <PaginationComponent
          count={compaignData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>{" "}
    </>
  );
};

export default Home;
