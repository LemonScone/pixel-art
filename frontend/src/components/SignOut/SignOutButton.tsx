import useAuth from "../../hooks/useAuth";
const SignOutButton = () => {
  const { signOut } = useAuth();
  return (
    <button
      type="button"
      className={
        "inline-flex items-center rounded-md px-3 py-2 text-sm  font-semibold text-gray-300 shadow-sm hover:bg-input-color hover:text-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-input-color"
      }
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
