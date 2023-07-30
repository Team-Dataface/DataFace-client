import { useState, useEffect } from "react";

function useLoading(isReactQueryLoading, delay = 200) {
  const [isLoadingTimeout, setIsLoadingTimeout] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoadingTimeout(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  const isLoadingCombined = isReactQueryLoading || !isLoadingTimeout;

  return isLoadingCombined;
}

export default useLoading;
