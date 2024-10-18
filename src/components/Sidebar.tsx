import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoImg from "../images/Logo.jpeg";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  setActiveMenu: (menuName: string) => void;
  setIsSidebarOpen?: (isOpen: boolean) => void; // Keeping it optional
}

const Sidebar: React.FC<SidebarProps> = ({
  setActiveMenu,
  setIsSidebarOpen,
}) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", path: "/" },
    { text: "New Email Campaign", path: "/new-email-campaign" },
    { text: "Targets", path: "/targets" },
    { text: "Email Templates", path: "/email-templates" },
    { text: "Landing Page Templates", path: "/landing-page-templates" },
    { text: "Campaigns Running", path: "/campaigns-running" },
    { text: "Reporting", path: "/reporting" },
    { text: "Settings", path: "/settings" },
  ];

  // Effect to set the active item based on the current location
  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (currentItem) {
      setActiveItem(currentItem.text);
      setActiveMenu(currentItem.text === "Dashboard" ? "" : currentItem.text);
    }
  }, [location.pathname, menuItems, setActiveMenu]);

  return (
    <Box
      component={"div"}
      sx={{
        width: "250px",
        backgroundColor: "#FFFFFF",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        boxShadow: "rgba(0, 0, 0, 0.50) 0px 3px 8px",
      }}
    >
      <Box
        component={"img"}
        sx={{ textAlign: "center", marginBottom: "20px" }}
        src={LogoImg}
        alt="Logo"
      />

      <Divider sx={{ borderBottomWidth: 2.5, marginBottom: "20px" }} />

      <Box sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <Link
            key={item.text}
            to={item.path}
            style={{
              display: "block",
              padding: "10px 0",
              textDecoration: activeItem === item.text ? "underline" : "none",
              color: activeItem === item.text ? "#0473E9" : "#000000",
              fontWeight: activeItem === item.text ? "bold" : "normal",
              fontFamily: "Nunito Sans",
            }}
            onClick={() => {
              setActiveItem(item.text);
              setActiveMenu(item.text === "Dashboard" ? "" : item.text);
              if (setIsSidebarOpen) {
                setIsSidebarOpen(false); // Close sidebar
              }
            }}
          >
            {item.text}
          </Link>
        ))}
      </Box>

      <Divider sx={{ borderBottomWidth: 2.5, marginY: "20px" }} />

      <Box
        component={"button"}
        sx={{
          width: "100%",
          padding: "15px 0",
          backgroundColor: "#0473E9",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => {
          if (setIsSidebarOpen) {
            setIsSidebarOpen(false); // Close sidebar on logout
          }
        }}
      >
        Log Out
      </Box>
    </Box>
  );
};

export default Sidebar;
