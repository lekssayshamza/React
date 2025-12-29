import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import users from "../data/users";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      navigate("/home", { state: { username: user.username } });
    } else {
      setError("Invalid username or password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="login-container">
      <h2>Teacher Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="submit" className="login-btn">
          Login
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
