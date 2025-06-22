import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Corrected import paths
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx"; // Renamed and path corrected
import CreatePost from "./components/Posts/CreatePost.jsx";
import PostList from "./components/Posts/PostList.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider must wrap all components that use the AuthContext */}

      <Navbar />
      <Routes>
        {/* Correctly assigned elements to routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/post-list" element={<PostList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
