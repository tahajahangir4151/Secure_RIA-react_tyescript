import React from "react";
import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import profileImg from "../images/ae4134169130626f5a6ff03cd06719fb.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface HeaderProps {
  title: string; // Prop for the title of the header
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#0473E9", justifyContent: "space-between" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>{" "}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt="User Profile" src={profileImg} />
          <Typography
            sx={{
              ml: 2,
              color: "#FFFFFF",
              // fontFamily: "Nunito Sans",
              fontSize: "15px",
              fontWeight: "400",
            }}
          >
            Jenny Wilson
          </Typography>
          <ArrowDropDownIcon sx={{ color: "#000000", ml: 0.5 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
