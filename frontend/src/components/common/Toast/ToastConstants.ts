import { ToastAnimation, ToastColor } from "../../../types/Toast";

const toastColor: ToastColor = {
  success: "bg-green-600 text-green-200",
  failure: "bg-rose-600 text-rose-200",
  information: "bg-blue-600 text-blue-200",
};

const toastBorderColor: ToastColor = {
  success: "border-green-900",
  failure: "border-rose-900",
  information: "border-blue-900",
};

const toastAnimation: ToastAnimation = {
  "top-left": "animate-toast-in-left",
  "bottom-left": "animate-toast-in-left",
  "top-right": "animate-toast-in-right",
  "bottom-right": "animate-toast-in-right",
};

export { toastColor, toastBorderColor, toastAnimation };
