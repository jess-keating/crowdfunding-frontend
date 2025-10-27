import { useState } from "react";
import postFundraiser from "../api/post-fundraiser";

function FundraiserForm({ onSuccess, onError }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
    setSuccess(null);

    // ✅ Validation: required fields
    if (!formData.title || !formData.description || !formData.goal || !formData.image) {
      setError("Please fill in all required fields (Title, Description, Goal, Image URL).");
      if (onError) onError("Missing required fields.");
      return;
    }

    // ✅ Get token from localStorage
    const token = window.localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a fundraiser.");
      if (onError) onError("Not logged in.");
      return;
    }

    setLoading(true);

    try {
      const newFundraiser = await postFundraiser(formData, token);

      // ✅ Show success message
      setSuccess("🎉 Fundraiser created successfully!");

      // ✅ Reset form
      setFormData({
        title: "",
        description: "",
        goal: "",
        image: "",
      });

      // ✅ Notify parent if provided
      if (onSuccess) onSuccess(newFundraiser);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create fundraiser. Please try again.");
      if (onError) onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fundraiser-form">
      <h2>Create a Fundraiser</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div>
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          placeholder="Fundraiser title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          placeholder="Tell people what your fundraiser is about"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="goal">Goal Amount ($) *</label>
        <input
          type="number"
          id="goal"
          placeholder="e.g. 1000"
          value={formData.goal}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="image">Image URL *</label>
        <input
          type="url"
          id="image"
          placeholder="https://example.com/image.jpg"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Fundraiser"}
      </button>
    </form>
  );
}

export default FundraiserForm;
