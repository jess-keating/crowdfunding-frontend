import { useState } from "react";
import useCreateFundraiser from "../hooks/use-create-fundraiser";

function FundraiserForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        is_open: true,
    });

    const [validationErrors, setValidationErrors] = useState({});
    const { createFundraiser, isLoading, error, success } = useCreateFundraiser();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required.";
        if (!formData.description.trim()) newErrors.description = "Description is required.";
        if (!formData.goal) newErrors.goal = "Goal amount is required.";
        else if (Number(formData.goal) <= 0) newErrors.goal = "Goal must be positive.";
        if (!formData.image.trim()) newErrors.image = "Image URL is required.";
        else if (!/^https?:\/\//i.test(formData.image)) newErrors.image = "Must start with http:// or https://";
        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const newFundraiser = await createFundraiser(formData);
            if (onSuccess) onSuccess(newFundraiser);
            setFormData({ title: "", description: "", goal: "", image: "", is_open: true });
        } catch {
            // errors handled inside the hook
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Fundraiser</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <label>Title *</label>
            <input id="title" value={formData.title} onChange={handleChange} />
            {validationErrors.title && <p style={{ color: "red" }}>{validationErrors.title}</p>}

            <label>Description *</label>
            <textarea id="description" value={formData.description} onChange={handleChange} />
            {validationErrors.description && <p style={{ color: "red" }}>{validationErrors.description}</p>}

            <label>Goal ($) *</label>
            <input id="goal" type="number" value={formData.goal} onChange={handleChange} />
            {validationErrors.goal && <p style={{ color: "red" }}>{validationErrors.goal}</p>}

            <label>Image URL *</label>
            <input id="image" type="url" value={formData.image} onChange={handleChange} />
            {validationErrors.image && <p style={{ color: "red" }}>{validationErrors.image}</p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Fundraiser"}
            </button>
        </form>
    );
}

export default FundraiserForm;
