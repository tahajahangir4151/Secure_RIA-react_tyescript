import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { compaignData } from "../data/compaignData";

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

      <Box sx={{ mt: 3, overflowX: "auto" }}>
        <TableContainer
          component={Paper}
          sx={{
            border: "1px solid #C1C1C1",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#000000",
                    fontSize: "14px",
                  }}
                >
                  Sent Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#000000",
                    fontSize: "14px",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#000000",
                    fontSize: "14px",
                  }}
                >
                  Open
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#000000",
                    fontSize: "14px",
                  }}
                >
                  Internal Clicks
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#000000",
                    fontSize: "14px",
                  }}
                >
                  Time Opened
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compaignData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ backgroundColor: getRowBackgroundColor(index) }}
                  >
                    <TableCell color="#000000">{row.setDate}</TableCell>
                    <TableCell color="#000000">{row.name}</TableCell>
                    <TableCell color="#000000">{row.openRate}</TableCell>
                    <TableCell color="#000000">{row.internalClick}</TableCell>
                    <TableCell color="#000000">{row.timeOpened}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Component */}
        <TablePagination
          component={"div"}
          count={compaignData.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 6, 7, 8, 9, 10]}
          labelRowsPerPage="Rows Per Page"
        />
      </Box>
    </>
  );
};

export default Home;
