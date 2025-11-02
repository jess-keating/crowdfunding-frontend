// src/components/UpdateFundraiserForm.jsx
import { useState, useEffect } from "react";
import useUpdateFundraiser from "../hooks/use-update-fundraiser";

function UpdateFundraiserForm({ fundraiser, onSuccess }) {
    const [formData, setFormData] = useState(fundraiser);
    const { updateFundraiser, isLoading, error, success } = useUpdateFundraiser();

    useEffect(() => {
        setFormData(fundraiser);
    }, [fundraiser]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateFundraiser(fundraiser.id, formData);
        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Fundraiser</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <label>Title</label>
            <input id="title" value={formData.title || ""} onChange={handleChange} />

            <label>Description</label>
            <textarea id="description" value={formData.description || ""} onChange={handleChange} />

            <label>Goal ($)</label>
            <input id="goal" type="number" value={formData.goal || ""} onChange={handleChange} />

            <label>Image URL</label>
            <input id="image" value={formData.image || ""} onChange={handleChange} />

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Update Fundraiser"}
            </button>
        </form>
    );
}

export default UpdateFundraiserForm;
