import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
            localStorage.setItem("token", res.data.token); // Store token for future requests
            navigate("/calendar");
        } catch (err) {
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Welcome Back</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

<p>
    Don't have an account? <a href="/register">Register here</a>.
</p>


export default Login;
