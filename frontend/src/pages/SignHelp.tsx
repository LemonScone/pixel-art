import ForgotPasswordForm from "../components/ForgotPasswordForm";

const SignIn = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[32rem] rounded bg-neutral-900 p-10 shadow-md">
        <h2 className="text-center text-2xl text-gray-100">Forgot Password</h2>

        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default SignIn;
