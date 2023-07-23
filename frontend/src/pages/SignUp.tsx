import SignUpForm from "../components/SignUp/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[32rem] rounded bg-neutral-900 p-10 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-100">
          Sign up to gridapixel
        </h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
