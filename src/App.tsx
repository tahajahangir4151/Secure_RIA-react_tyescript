import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  // Maintain a state to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("userInfo")
  );

  useEffect(() => {
    // Track localStorage changes, in case user manually logs out or clears storage
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("userInfo"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect to Dashboard if loggedIn otherwise show Login  */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={"/dashboard"} replace={true} />
            ) : (
              <Login onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
