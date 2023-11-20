import { useEffect, useRef, useState } from "react";

export default function useIsUpdatingValue<T extends number | string | null>(
  value: T,
  delay: number
) {
  const [isUpdating, setIsUpdating] = useState(false);
  const lastValue = useRef(value);

  useEffect(() => {
    if (lastValue.current === value) return;

    if (!isUpdating) {
      setIsUpdating(true);
    }

    const timer = setTimeout(() => {
      lastValue.current = value;
      setIsUpdating(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, value, isUpdating]);

  return isUpdating;
}
