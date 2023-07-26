const positions = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const;

type ToastPosition = (typeof positions)[number];

const toastTypes = ["success", "failure", "information"] as const;

type ToastType = (typeof toastTypes)[number];

type ToastAnimation = {
  [key in ToastPosition]: string;
};

type ToastColor = {
  [key in ToastType]: string;
};

type ToastIcon = {
  [key in ToastType]: React.ReactElement;
};

type Toast = {
  id: number;
  type: ToastType;
  message: string;
};

export type {
  Toast,
  ToastPosition,
  ToastType,
  ToastAnimation,
  ToastColor,
  ToastIcon,
};
