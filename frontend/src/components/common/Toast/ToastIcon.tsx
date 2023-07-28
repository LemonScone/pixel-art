import { ToastType } from "../../../types/Toast";
import {
  BellIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const ToastIcon = ({ type }: { type: ToastType }) => {
  const icon = {
    success: <CheckIcon className="h-5 w-5" />,
    failure: <ExclamationCircleIcon className="h-5 w-5" />,
    information: <BellIcon className="h-5 w-5" />,
  };

  const toastIcon = icon[type];

  return <>{toastIcon}</>;
};

export default ToastIcon;
