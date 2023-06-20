import { useEffect, useRef } from "react";

const useOutsidePointerUp = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerup = (event: PointerEvent) => {
      const element = event.target as Element;
      if (ref.current && !ref.current.contains(element)) {
        callback();
      }
    };

    document.addEventListener("pointerup", handlePointerup);

    return () => {
      document.removeEventListener("pointerup", handlePointerup);
    };
  }, []);

  return ref;
};

export default useOutsidePointerUp;
