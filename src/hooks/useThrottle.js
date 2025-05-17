import { useState, useEffect, useRef, useCallback } from 'react';

// Throttle hook - limits how frequently a function can be called
function useThrottle(value, limit = 300) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

// Throttled function hook - creates a throttled version of a callback
export const useThrottledFn = (callback, limit = 300) => {
  const lastRan = useRef(Date.now());
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    if (Date.now() - lastRan.current >= limit) {
      callback(...args);
      lastRan.current = Date.now();
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        lastRan.current = Date.now();
      }, limit - (Date.now() - lastRan.current));
    }
  }, [callback, limit]);
};

export default useThrottle;