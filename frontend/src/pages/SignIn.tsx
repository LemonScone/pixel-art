import { Link } from "react-router-dom";

import SignInForm from "../components/SignIn/SignInForm";

const SignIn = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[32rem] rounded bg-neutral-900 p-10 shadow-md">
        <h2 className="text-center text-2xl text-gray-100">
          Sign in to Grida Pixel
        </h2>
        <SignInForm />
        <div className="mt-2 flex justify-end text-sm text-gray-100">
          <Link to="/signhelp">Need help?</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
