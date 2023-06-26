const Signin = () => {
  return (
    <div className="mx-auto mt-6 max-w-2xl">
      <div className="mb-4 flex flex-col rounded bg-neutral-900 px-8 pb-8 pt-6 shadow-md">
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-100"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full appearance-none rounded border bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-100"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border-red mb-3 w-full appearance-none rounded border bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="">
          <button
            className="w-full rounded bg-primary-color-600 px-4 py-2 font-bold text-black hover:bg-primary-color-500"
            type="button"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
