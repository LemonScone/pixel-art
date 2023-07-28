import { useEffect, useRef } from "react";

export const useInterval = <T>(
  callback: () => void,
  delay = 100,
  deps: T[]
) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const runCallback = () => {
      savedCallback.current && savedCallback.current();
    };

    const interval = setInterval(runCallback, delay);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
};
