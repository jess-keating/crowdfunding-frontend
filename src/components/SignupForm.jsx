import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup";
import postLogin from "../api/post-login";
import "./AuthForm.css";

function SignupForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        // ✅ Basic validation
        for (let field of ["username", "password", "email", "first_name", "last_name"]) {
            if (!formData[field].trim()) {
                setError("All fields are required.");
                return;
            }
        }

        setLoading(true);

        try {
            // ✅ Step 1: Create new user
            await postSignup(formData);

            // ✅ Step 2: Immediately log in
            const loginResponse = await postLogin(formData.username, formData.password);

            // ✅ Step 3: Store token
            window.localStorage.setItem("token", loginResponse.token);

            // ✅ Step 4: Success feedback
            alert("Signup successful! You’re now logged in.");
            navigate("/");
        } catch (err) {
            console.error("Signup or login failed:", err);
            const msg =
                err.serverData?.detail ||
                err.serverData?.error ||
                err.message ||
                "Signup failed. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Create an Account</h2>

            {error && <p className="error-message">{error}</p>}

            <div>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="first_name">First Name:</label>
                <input
                    id="first_name"
                    type="text"
                    placeholder="Enter first name"
                    value={formData.first_name}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                    id="last_name"
                    type="text"
                    placeholder="Enter last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
            </button>
        </form>
    );
}

export default SignupForm;
