// src/components/LoginPage.jsx
import React, { useState } from "react";
import "./LoginPage.css"; // optional for styling

function LoginPage({ onLogin, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Predefined demo users
  const users = {
    akhil: "1234",
    john: "1234",

  };

  const handleLogin = () => {
    if (users[username] && users[username] === password) {
      onLogin(username);
      localStorage.setItem("loggedUser", username);
    } else {
      alert("❌ Invalid username or password");
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default LoginPage;
