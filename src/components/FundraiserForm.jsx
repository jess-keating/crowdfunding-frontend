import { useState } from "react";
import postFundraiser from "../api/post-fundraiser";

function FundraiserForm({ onSuccess, onError }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        is_open: true,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    // Validation helper
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required.";
        if (!formData.description.trim()) newErrors.description = "Description is required.";
        if (!formData.goal) newErrors.goal = "Goal is required.";
        else if (Number(formData.goal) <= 0) newErrors.goal = "Goal must be a positive number.";
        if (!formData.image.trim()) newErrors.image = "Image URL is required.";
        else if (!/^https?:\/\//i.test(formData.image)) newErrors.image = "Image URL must start with http:// or https://";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess(null);
        if (!validateForm()) return;

        const token = window.localStorage.getItem("token");
        if (!token) {
            setErrors({ submit: "You must be logged in to create a fundraiser." });
            if (onError) onError("Not logged in.");
            return;
        }

        setLoading(true);

        try {
            const newFundraiser = await postFundraiser(formData);
            setSuccess("🎉 Fundraiser created successfully!");
            setFormData({ title: "", description: "", goal: "", image: "", is_open: true });
            if (onSuccess) onSuccess(newFundraiser);
        } catch (err) {
            console.error("Error creating fundraiser:", err);
            setErrors({ submit: err.message || "Failed to create fundraiser. Please try again." });
            if (onError) onError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="fundraiser-form">
            <h2>Create a Fundraiser</h2>

            {errors.submit && <p style={{ color: "red" }}>{errors.submit}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <label htmlFor="title">Title *</label>
            <input id="title" value={formData.title} onChange={handleChange} />
            {errors.title && <p className="error">{errors.title}</p>}

            <label htmlFor="description">Description *</label>
            <textarea id="description" value={formData.description} onChange={handleChange} />
            {errors.description && <p className="error">{errors.description}</p>}

            <label htmlFor="goal">Goal Amount ($) *</label>
            <input id="goal" type="number" value={formData.goal} onChange={handleChange} />
            {errors.goal && <p className="error">{errors.goal}</p>}

            <label htmlFor="image">Image URL *</label>
            <input id="image" type="url" value={formData.image} onChange={handleChange} />
            {errors.image && <p className="error">{errors.image}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Fundraiser"}
            </button>
        </form>
    );
}

export default FundraiserForm;
