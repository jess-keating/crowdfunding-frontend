import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup";
import postLogin from "../api/post-login";

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
const [loading, setLoading] = useState(false);

const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
    ...prevData,
    [id]: value,
    }));
};

const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!formData.username || !formData.password || !formData.email || !formData.firstname || !formData.lastname) {
    setError("All fields are required");
    return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create the new account
    await postSignup(formData.username, formData.password, formData.email);

      // 2️⃣ Immediately log the user in using the same credentials
    const loginResponse = await postLogin(formData.username, formData.password);

      // 3️⃣ Save the token to localStorage
    window.localStorage.setItem("token", loginResponse.token);

      // 4️⃣ Optional success message, then redirect
    alert("Signup successful! You’re now logged in.");
    navigate("/");

    } catch (err) {
    console.error("Signup or login failed:", err);
    setError(err.message || "Something went wrong. Please try again.");
    } finally {
    setLoading(false);
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
