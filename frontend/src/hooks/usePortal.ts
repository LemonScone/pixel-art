import { useEffect, useRef } from "react";

export const usePortal = () => {
  const container = document.createElement("div");
  const portal = useRef(container);

  useEffect(() => {
    const current = portal.current;
    document.body.appendChild(portal.current);
    return () => void document.body.removeChild(current);
  });

  return portal;
};
