import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <Link to={user ? "/dashboard" : "/"}>Home</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        // Added the "else" case for when no user is logged in
        <>
          <Link to="/login">Login</Link>
          <Link to={"/register"}>Register</Link>
          <Link to={"/dashboard"}>Dashboard</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
