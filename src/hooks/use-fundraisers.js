import { useState, useEffect, useCallback } from "react";

import getFundraisers from "../api/get-fundraisers";

export default function useFundraisers() {
  // state for fundraisers, loading and error
  const [fundraisers, setFundraisers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch function we can call on mount and for retries
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFundraisers();
      setFundraisers(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // expose a refetch so UI can retry on error
  return { fundraisers, isLoading, error, refetch: fetchData };
}