import { ReactNode, useEffect, useRef } from "react";

import classNames from "../../utils/classNames";
import { usePortal } from "../../hooks/usePortal";
import { createPortal } from "react-dom";
import { getFocusableElements, nextFocus } from "../../utils/focusable";

type FrameProps = {
  open?: boolean;
  closeOnEsc?: boolean;
  closeOnClickOutside?: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Frame = ({
  open = true,
  closeOnEsc = true,
  closeOnClickOutside = true,
  onClose,
  children,
}: FrameProps) => {
  const portal = usePortal();
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "Escape": {
          if (closeOnEsc) {
            onClose();
          }
          break;
        }
        case "Tab": {
          e.preventDefault();
          nextFocus(getFocusableElements(container.current), !e.shiftKey);
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, onClose, open]);

  useEffect(() => {
    document
      .getElementById("root")
      ?.setAttribute("aria-hidden", open.toString());
    portal.current?.setAttribute("aria-hidden", (!open).toString());

    if (open) {
      previousFocus.current = (document.activeElement as HTMLElement) ?? null;
      nextFocus(getFocusableElements(container.current));
    } else {
      previousFocus.current?.focus?.();
      previousFocus.current = null;
    }
  }, [open, portal]);

  const container = useRef<HTMLDivElement>(null);
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={classNames(
        "fixed inset-0 z-10 bg-gray-600/90 p-8 text-gray-100",
        `${open ? "block" : "hidden"}`
      )}
      onClick={closeOnClickOutside ? handleOverlayClick : undefined}
    >
      <div className="relative mx-auto mt-8 w-full max-w-sm" ref={container}>
        <button
          className="absolute -right-2 -top-2 flex h-8 w-8 cursor-pointer justify-center rounded-full bg-primary-color text-gray-800 shadow-xl"
          onClick={() => onClose()}
          title="close"
        >
          <span className="select-none text-2xl leading-7">&times;</span>
        </button>
        <div className="overflow-hidden rounded bg-gray-600 shadow-xl">
          {children}
        </div>
      </div>
    </div>,
    portal.current
  );
};

const Head = ({ children }: { children: ReactNode }) => (
  <div className="block bg-neutral-900 p-4">
    <h1 className="text-lg">{children}</h1>
  </div>
);

const Body = ({ children }: { children: ReactNode }) => (
  <div className="p-4">{children}</div>
);

export const Modal = { Frame, Head, Body };
