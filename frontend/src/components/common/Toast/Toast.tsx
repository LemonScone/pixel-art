import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../hooks/useRedux";
import { dismissNotification } from "../../../store";

import classNames from "../../../utils/classNames";

import ToastIcon from "./ToastIcon";

import { toastColor, toastBorderColor, toastAnimation } from "./ToastConstants";

import { ToastPosition, ToastType } from "../../../types/Toast";

type ToastProps = {
  id: number;
  message: string;
  type: ToastType;
  position: ToastPosition;
};

const Toast = ({ id, message, type, position }: ToastProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={classNames(
        toastBorderColor[type],
        toastAnimation[position],
        "mb-2 flex w-full max-w-xs transform items-center  rounded-lg border-2 bg-neutral-900 p-4 text-gray-400 opacity-95 shadow hover:opacity-100 hover:shadow-lg"
      )}
      role="alert"
    >
      <div
        className={classNames(
          toastColor[type],
          "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
        )}
      >
        <ToastIcon type={type} />
      </div>
      <div className="ml-3 text-sm font-normal">
        <p>{message}</p>
      </div>
      <button
        className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 cursor-pointer rounded-lg bg-neutral-900 p-1.5 text-gray-500 hover:bg-input-color hover:text-white focus:ring-2 focus:ring-gray-300"
        onClick={() => {
          dispatch(dismissNotification(id));
        }}
      >
        <XMarkIcon />
      </button>
    </div>
  );
};

export default Toast;
