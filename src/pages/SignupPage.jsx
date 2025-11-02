import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import "../components/AuthForm.css";

function SignupPage() {
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Sign up</h2>
        <SignupForm />
        <p className="muted" style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
