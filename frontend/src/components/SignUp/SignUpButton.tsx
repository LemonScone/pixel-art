import { NavLink } from "react-router-dom";
import classNames from "../../utils/classNames";

const SignUpButton = () => {
  return (
    <NavLink
      to="signup"
      type="button"
      className={({ isActive }) =>
        classNames(
          isActive
            ? "bg-input-color text-gray-100"
            : "text-gray-300 hover:bg-input-color hover:text-gray-100",
          "ml-2 inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-input-color"
        )
      }
      aria-current="page"
    >
      Sign Up
    </NavLink>
  );
};

export default SignUpButton;
