import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Use the same styling as the login page

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                password,
            });
            alert("Registration successful!");
            navigate("/login"); // Redirect to login after successful registration
        } catch (err) {
            alert(err.response?.data?.error || "Registration failed!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Create an Account</h1>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Register
                    </button>
                </form>
                <p>
                    Already have an account? <a href="/login">Log in here</a>.
                </p>
            </div>
        </div>
    );
}

<p>
    Already have an account? <a href="/login">Log in here</a>.
</p>


export default Register;
