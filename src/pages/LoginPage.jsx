import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "../components/AuthForm.css"; // reuse auth form styles

function LoginPage() {
    return (
        <div className="auth-page">
            <div className="auth-form">
                <h2>Login</h2>
                <LoginForm />
                <p className="muted" style={{ textAlign: "center", marginTop: "1rem" }}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;