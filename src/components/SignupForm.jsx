import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup";

function SignupForm() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
});

const [error, setError] = useState(null);

const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
    ...prevData,
    [id]: value,
    }));
};

const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    if (formData.username && formData.password && formData.email) {
    postSignup(formData.username, formData.password, formData.email)
        .then((response) => {
        console.log("Signup successful:", response);
          // Redirect to login so they can sign in
        navigate("/login");
        })
        .catch((err) => {
        console.error("Signup failed:", err);
        setError(err.message);
        });
    } else {
    setError("All fields are required");
    }
};

return (
    <form onSubmit={handleSubmit}>
    <h2>Create an Account</h2>

    {error && <p style={{ color: "red" }}>{error}</p>}

    <div>
        <label htmlFor="username">Username:</label>
        <input
        type="text"
        id="username"
        placeholder="Enter username"
        onChange={handleChange}
        />
    </div>

    <div>
        <label htmlFor="firstname">First Name:</label>
        <input
        type="text"
        id="firstname"
        placeholder="Enter first name"
        onChange={handleChange}
        />
    </div>

    <div>
        <label htmlFor="lastname">Last Name:</label>
        <input
        type="text"
        id="lastname"
        placeholder="Enter last name"
        onChange={handleChange}
        />
    </div>

    <div>
        <label htmlFor="email">Email:</label>
        <input
        type="email"
        id="email"
        placeholder="Enter email"
        onChange={handleChange}
        />
    </div>

    <div>
        <label htmlFor="password">Password:</label>
        <input
        type="password"
        id="password"
        placeholder="Password"
        onChange={handleChange}
        />
    </div>

    <button type="submit">Sign Up</button>
    </form>
);
}

export default SignupForm;
