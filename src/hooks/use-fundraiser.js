// src/hooks/use-fundraiser.js
import { useState, useEffect, useCallback } from "react";
import getFundraiser from "../api/get-fundraiser";

export default function useFundraiser(fundraiserId) {
  const [fundraiser, setFundraiser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ reusable fetch function
  const fetchFundraiser = useCallback(async () => {
    if (!fundraiserId) return;
    setIsLoading(true);
    setError(null);

    try {
      const data = await getFundraiser(fundraiserId);
      setFundraiser(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [fundraiserId]);

  // ✅ initial fetch on mount / id change
  useEffect(() => {
    fetchFundraiser();
  }, [fetchFundraiser]);

  // ✅ expose refetch for manual refresh
  return { fundraiser, isLoading, error, refetch: fetchFundraiser };
}
