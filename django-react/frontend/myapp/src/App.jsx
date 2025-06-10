import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Assuming useAuth is exported from here

// Corrected import paths
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./components/auth/Login.jsx"; // Renamed and path corrected
import Navbar from "./components/Navbar.jsx"; // Renamed and path corrected

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider must wrap all components that use the AuthContext */}
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Correctly assigned elements to routes */}
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// This component protects routes that require authentication
function PrivateRoute({ children }) {
  const { user } = useAuth(); // useAuth hook provides the user state
  return user ? children : <Navigate to="/login" />;
}

export default App;
