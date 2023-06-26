import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = event.target as Element;
      if (ref.current && !ref.current.contains(element)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
};

export default useOutsideClick;
