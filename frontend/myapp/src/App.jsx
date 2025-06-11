import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Assuming useAuth is exported from here

// Corrected import paths
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./components/auth/Login.jsx"; // Renamed and path corrected
import Navbar from "./components/Navbar.jsx"; // Renamed and path corrected
import CreatePost from "./components/Posts/CreatePost.jsx";
import PostList from "./components/Posts/PostList.jsx";
import Register from "./components/auth/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider must wrap all components that use the AuthContext */}
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Correctly assigned elements to routes */}
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/post-list" element={<PostList />}></Route>
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
