import { useState, useEffect } from "react";

function useLoading(isQueryLoading, delay = 300) {
  const [isLoadingTimeout, setIsLoadingTimeout] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoadingTimeout(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  const isLoadingCombined = isQueryLoading || !isLoadingTimeout;

  return isLoadingCombined;
}

export default useLoading;
