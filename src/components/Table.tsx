import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

interface TableComponentProps {
  data: Array<any>;
  headers: Array<string>;
  getRowBackgroundColor?: (index: number) => string;
  renderActions?: (row: any) => ReactNode;
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  headers,
  getRowBackgroundColor,
  renderActions,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid #C1C1C1",
        maxHeight: "65vh",
        overflow: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                sx={{ fontWeight: "bold", color: "#000000" }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: getRowBackgroundColor
                  ? getRowBackgroundColor(index)
                  : "#FFF",
              }}
            >
              {/* Render each value except 'id' */}
              {Object.entries(row).map(([key, value], idx) => {
                if (key !== "id") {
                  // Skip rendering the 'id'
                  return <TableCell key={idx}>{value as ReactNode}</TableCell>;
                }
                return null; // Do nothing for 'id'
              })}

              {/* Add action icons to the last column */}
              {renderActions && (
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start", // Align icons horizontally
                      alignItems: "center", // Vertically center the icons
                    }}
                  >
                    {renderActions(row)}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
