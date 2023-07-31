import { useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "../../../hooks/useRedux";

import Toast from "./Toast";
import classNames from "../../../utils/classNames";

const ToastList = () => {
  const { data, position } = useAppSelector((state) => state.notifications);

  const listRef = useRef(null);

  const handleScrolling = useCallback(
    (el: HTMLDivElement) => {
      const isTopPosition = ["top-left", "top-right"].includes(position);

      if (isTopPosition) {
        el?.scrollTo(0, el.scrollHeight);
      } else {
        el?.scrollTo(0, 0);
      }
    },
    [position]
  );

  useEffect(() => {
    if (listRef.current) {
      handleScrolling(listRef.current);
    }
  }, [position, handleScrolling]);

  const storedData = position.includes("bottom")
    ? [...data].reverse()
    : [...data];

  return (
    storedData.length > 0 && (
      <div
        className={classNames(
          position,
          "fixed z-40 max-h-screen w-full max-w-sm overflow-y-auto overflow-x-hidden p-4"
        )}
        ref={listRef}
        aria-live="assertive"
      >
        {data.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            position={position}
          />
        ))}
      </div>
    )
  );
};

export default ToastList;
