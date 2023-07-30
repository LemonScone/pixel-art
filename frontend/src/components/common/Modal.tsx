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
  size?: string;
  children: ReactNode;
};

const Frame = ({
  open = true,
  closeOnEsc = true,
  closeOnClickOutside = true,
  onClose,
  size = "sm",
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

      document.body.classList.add("overflow-y-hidden");
    } else {
      previousFocus.current?.focus?.();
      previousFocus.current = null;

      document.body.classList.remove("overflow-y-hidden");
    }
  }, [open, portal]);

  const container = useRef<HTMLDivElement>(null);
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) {
      onClose();
    }
  };

  const containerSize: { [key: string]: string } = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  };

  return createPortal(
    <div
      className={classNames(
        "fixed inset-0 z-30 h-screen bg-gray-600/90 p-8 text-gray-100",
        `${open ? "block" : "hidden"}`
      )}
      onClick={closeOnClickOutside ? handleOverlayClick : undefined}
    >
      <div
        className={`relative mx-auto mt-8 w-full ${containerSize[size]}`}
        ref={container}
      >
        <button
          className="absolute -right-2 -top-2 z-10 flex h-8 w-8 cursor-pointer justify-center rounded-full bg-primary-color text-gray-800 shadow-xl"
          onClick={() => onClose()}
          title="close"
        >
          <span className="select-none text-2xl leading-7">&times;</span>
        </button>
        <div className="rounded-xl bg-input-color shadow-xl">{children}</div>
      </div>
    </div>,
    portal.current
  );
};

const Head = ({ children }: { children: ReactNode }) => (
  <div className="block rounded-t-xl bg-neutral-900 p-4">
    <h1 className="text-lg font-bold">{children}</h1>
  </div>
);

const Body = ({ children }: { children: ReactNode }) => (
  <div className="max-h-[80vh] overflow-y-auto p-4">{children}</div>
);

export const Modal = { Frame, Head, Body };
