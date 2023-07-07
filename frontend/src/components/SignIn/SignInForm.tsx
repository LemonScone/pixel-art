import { ChangeEvent, FormEvent, useState } from "react";
import { useSignInFormValidator } from "../../hooks/useSignInFormValidator";
import useAuth from "../../hooks/useAuth";
import httpStatus from "../../constants/httpStatus";

const SignInForm = () => {
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const { signIn } = useAuth();

  const [unAuthorized, setUnAuthorized] = useState(false);

  const { errors, validateForm, onBlurField } = useSignInFormValidator(form);

  const handleChange = (e: ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      const field = e.target.name as keyof typeof errors;

      const nextFormState = {
        ...form,
        [field]: e.target.value,
      };

      setForm(nextFormState);

      if (errors[field].dirty) {
        validateForm({
          form: nextFormState,
          errors,
          field,
        });
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) {
      return;
    }

    const result = await signIn({
      userId: form.id,
      password: form.password,
    });

    if (result?.status === httpStatus.UNAUTHORIZED) {
      setUnAuthorized(true);
      setForm({
        id: "",
        password: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="SignIn Form"
      className="mb-4 flex flex-col rounded bg-neutral-900 px-8 pb-8 pt-6 shadow-md"
    >
      {unAuthorized && (
        <div className="mb-4 rounded bg-rose-500 p-2 text-gray-100">
          Sorry, we can't find an account with this id. Please try again or
          create a new account.
        </div>
      )}
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-100"
          htmlFor="id"
        >
          ID
        </label>
        <input
          className={
            errors.id.dirty && errors.id.error
              ? `w-full appearance-none rounded border border-rose-500 bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600`
              : `w-full appearance-none rounded border bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600`
          }
          id="id"
          name="id"
          type="text"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
          onBlur={onBlurField}
        />
        {errors.id.dirty && errors.id.error ? (
          <p className="pt-2 italic  text-rose-500">{errors.id.message}</p>
        ) : null}
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-bold text-gray-100"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={
            errors.password.dirty && errors.password.error
              ? `w-full appearance-none rounded border border-rose-500 bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600`
              : `w-full appearance-none rounded border bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600`
          }
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          onBlur={onBlurField}
        />
        {errors.password.dirty && errors.password.error ? (
          <p className="pt-2 italic  text-rose-500">
            {errors.password.message}
          </p>
        ) : null}
      </div>
      <div className="">
        <button
          className="w-full rounded bg-primary-color-600 px-4 py-2 font-bold text-black hover:bg-primary-color-500"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
