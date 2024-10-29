import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewEmailCompaign from "./pages/NewEmailCompaign";
import Targets from "./pages/Targets";
import EmailTemplates from "./pages/emailTemplates";
import LandinPageTemplate from "./pages/LandinPageTemplate";
import CompaignRunning from "./pages/CompaignRunning";
import Reporting from "./pages/Reporting";
import { Settings } from "@mui/icons-material";
import TemplateEditor from "./components/templateEditor";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("userInfo")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("userInfo"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            ) : (
              <Login onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />{" "}
        <Route
          path="/new-email-campaign"
          element={
            <DashboardLayout>
              <NewEmailCompaign />
            </DashboardLayout>
          }
        />
        <Route
          path="/targets"
          element={
            <DashboardLayout>
              <Targets />
            </DashboardLayout>
          }
        />
        <Route
          path="/email-templates"
          element={
            <DashboardLayout>
              <EmailTemplates />
            </DashboardLayout>
          }
        />
        <Route
          path="/landing-page-templates"
          element={
            <DashboardLayout>
              <LandinPageTemplate />
            </DashboardLayout>
          }
        />
        <Route
          path="/campaigns-running"
          element={
            <DashboardLayout>
              <CompaignRunning />
            </DashboardLayout>
          }
        />
        <Route
          path="/reporting"
          element={
            <DashboardLayout>
              <Reporting />{" "}
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />{" "}
        <Route
          path="/template-editor"
          element={
            <DashboardLayout>
              <TemplateEditor />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
