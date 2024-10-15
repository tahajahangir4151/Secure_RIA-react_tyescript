import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const isAuthenticated = localStorage.getItem("user");
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
              <Login />
            )
          }
        />

        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
