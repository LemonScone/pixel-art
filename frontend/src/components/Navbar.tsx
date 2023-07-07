import { NavLink } from "react-router-dom";

import SwitchCase from "./common/SwitchCase";
import SignOutButton from "./SignOut/SignOutButton";
import SignInButton from "./SignIn/SignInButton";

import useAuth from "../hooks/useAuth";
import { AUTHENTICATED, UNAUTHENTICATED } from "../constants";

import classNames from "../utils/classNames";
import { useRefreshQuery } from "../store";

const navigation = [
  { name: "Editor", href: "" },
  { name: "Gallery", href: "gallery" },
];

const Navbar = () => {
  const { accessToken } = useAuth();
  useRefreshQuery(undefined, {
    skip: !!accessToken,
  });

  const authStatus = accessToken ? AUTHENTICATED : UNAUTHENTICATED;

  return (
    <nav className="bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://user-images.githubusercontent.com/6129764/247850132-8348058d-5b71-4cbe-8f76-0dd5acff9129.png"
                alt="Pixel-art"
              />
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-input-color text-gray-100"
                        : "text-gray-300 hover:bg-input-color hover:text-gray-100",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )
                  }
                  aria-current={item.name ? "page" : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <SwitchCase
              value={authStatus}
              caseBy={{
                AUTHENTICATED: <SignOutButton />,
                UNAUTHENTICATED: <SignInButton />,
              }}
            />
            <div className="relative ml-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-primary-color-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-primary-color-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color-600"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
