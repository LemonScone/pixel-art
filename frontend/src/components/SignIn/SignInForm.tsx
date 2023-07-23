import { ChangeEvent, FormEvent, useState } from "react";
import { useSignInFormValidator } from "../../hooks/useSignInFormValidator";
import useAuth from "../../hooks/useAuth";
import httpStatus from "../../constants/httpStatus";
import { NavLink, useLocation } from "react-router-dom";

const SignInForm = () => {
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.autofill,
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
      email: form.email,
      password: form.password,
    });

    if (result?.status) {
      if (
        result.status === httpStatus.UNAUTHORIZED ||
        result.status === httpStatus.NOT_FOUND
      ) {
        setUnAuthorized(true);
        setForm({
          email: "",
          password: "",
        });
      }
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
          Sorry, we can't find an account with this email. Please try again
          or&nbsp;
          <NavLink to="/signup" className="underline">
            create a new account.
          </NavLink>
        </div>
      )}
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-100"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={
            errors.email.dirty && errors.email.error
              ? `w-full appearance-none rounded border border-rose-500 bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600`
              : `w-full appearance-none rounded border bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600`
          }
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onBlur={onBlurField}
        />
        {errors.email.dirty && errors.email.error ? (
          <p className="pt-2 italic  text-rose-500">{errors.email.message}</p>
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
