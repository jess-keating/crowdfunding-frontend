import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";
import "./AuthForm.css";

function LoginForm() {
    const navigate = useNavigate(); 
    const { setAuth } = useAuth();
    
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                const user = {
                    id: response.user_id,
                    email: response.email,
                    username: credentials.username,
                };
                
                // Save BOTH token and user to localStorage
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("user", JSON.stringify(user));
                
                // Update auth context
                setAuth({
                    token: response.token,
                    user: user,
                });
                navigate("/");
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onChange={handleChange}
                    value={credentials.username}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={credentials.password}
                />
            </div>
            <button type="submit">
                Login
            </button>
        </form>
    );
}

export default LoginForm;