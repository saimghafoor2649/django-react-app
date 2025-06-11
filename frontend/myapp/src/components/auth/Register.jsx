import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/authform.css";
function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const { register } = useContext(AuthContext); // ✅ lowercase
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(credentials);
      navigate("/login");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="centered-page">
      <div class="auth-form">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
