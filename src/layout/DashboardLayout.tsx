import {
  Box,
  CssBaseline,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Add this line

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = () => {
    setMobileOpen(false); // Close mobile drawer
    setIsSidebarOpen(false); // Close sidebar
  };

  const headerTitle = activeMenu ? `Dashboard | ${activeMenu}` : "Dashboard";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
          }}
        >
          <Sidebar
            setActiveMenu={setActiveMenu}
            setIsSidebarOpen={handleMenuItemClick} // Pass the click handler
          />
        </Drawer>
      ) : (
        <Sidebar
          setActiveMenu={setActiveMenu}
          setIsSidebarOpen={handleMenuItemClick} // Pass the click handler
        />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Header
          title={headerTitle}
          onMenuClick={handleDrawerToggle}
          isMobile={isMobile}
        />
        <Box component={"main"} sx={{ p: 3, mt: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
