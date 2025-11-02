import { useState, useCallback } from "react";
import postFundraiser from "../api/post-fundraiser";

export default function useCreateFundraiser() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

const createFundraiser = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
    const token = window.localStorage.getItem("token");
    if (!token)
        throw new Error("You must be logged in to create a fundraiser.");

    const newFundraiser = await postFundraiser(formData);
    setSuccess("🎉 Fundraiser created successfully!");
    return newFundraiser;
    } catch (err) {
    console.error("Error creating fundraiser:", err);
    setError(err.message || "Failed to create fundraiser. Please try again.");
    throw err;
    } finally {
    setIsLoading(false);
    }
}, []);

return {
    createFundraiser,
    isLoading,
    error,
    success,
};
}
