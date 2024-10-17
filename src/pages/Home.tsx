import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Home: React.FC = () => {
  return (
    <Box sx={{ justifyContent: "space-between", display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          component={"h4"}
          variant="h4"
          sx={{
            color: "#0473E9",
            fontWeight: "bold",
            fontSize: "30px",
            fontFamily: "Nunito Sans",
          }}
        >
          Campaigns Running
        </Typography>
        <Typography color="#000000" mt={"10px"} fontSize={"14px"}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Typography>
      </Box>
      <Button
        sx={{
          backgroundColor: "#0473E9",
          color: "#FFFFFF",
          fontSize: "16px",
          padding: "5px 20px",
          borderRadius: "5px",
          height:"55px",
          "&:hover": {
            backgroundColor: "#005BB5", 
          },
        }}
      >
        Create New Email
      </Button>
    </Box>
  );
};

export default Home;
