// src/hooks/use-update-fundraiser.js
import { useState, useCallback } from "react";
import putFundraiser from "../api/put-fundraiser";

export default function useUpdateFundraiser() {
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

const updateFundraiser = useCallback(async (fundraiserId, data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
    const updated = await putFundraiser(fundraiserId, data);
    setSuccess("✅ Fundraiser updated successfully!");
    return updated;
    } catch (err) {
    console.error("Error updating fundraiser:", err);
    setError(err.message);
    throw err;
    } finally {
    setIsLoading(false);
    }
}, []);

return { updateFundraiser, isLoading, error, success };
}
