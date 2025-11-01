import { useState } from "react";
import useCreatePledge from "../hooks/use-create-pledge";

function PledgeForm({ fundraiserId, onSuccess }) {
    const [formData, setFormData] = useState({
        amount: "",
        comment: "",
        anonymous: false,
    });

    const { createPledge, isLoading, error, success } = useCreatePledge();

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.amount || Number(formData.amount) <= 0) {
            alert("Please enter a valid pledge amount.");
            return;
        }

        try {
            const newPledge = await createPledge({ ...formData, fundraiser: fundraiserId });
            setFormData({ amount: "", comment: "", anonymous: false });
            if (onSuccess) onSuccess(newPledge); // ✅ Pass new pledge object up
        } catch {
            // handled by hook
        }
    };


    return (
        <form onSubmit={handleSubmit} className="pledge-form">
            <h3>Make a Pledge</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <div>
                <label htmlFor="amount">Amount ($)</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Enter your pledge"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="comment">Comment (optional)</label>
                <input
                    type="text"
                    id="comment"
                    placeholder="Leave a message of support"
                    value={formData.comment}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="anonymous">
                    <input
                        type="checkbox"
                        id="anonymous"
                        checked={formData.anonymous}
                        onChange={handleChange}
                    />
                    Pledge anonymously
                </label>
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Pledge"}
            </button>
        </form>
    );
}

export default PledgeForm;
