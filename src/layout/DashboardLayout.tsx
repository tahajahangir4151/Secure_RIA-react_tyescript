import { Box, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeMenu, setActiveMenu] = useState<string>(""); // Initialize with an empty string

  // Construct the header title based on the active menu
  const headerTitle = activeMenu ? `Dashboard | ${activeMenu}` : "Dashboard";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar setActiveMenu={setActiveMenu} />{" "}
      {/* Pass setActiveMenu to Sidebar */}
      <Box sx={{ flexGrow: 1 }}>
        <Header title={headerTitle} /> {/* Pass constructed headerTitle */}
        <Box component={"main"} sx={{ p: 3, mt: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
