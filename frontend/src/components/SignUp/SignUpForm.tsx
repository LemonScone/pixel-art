import { ChangeEvent, FormEvent, useState } from "react";
import { useSignUpFormValidator } from "../../hooks/useSignUpFormValidator";
import useAuth from "../../hooks/useAuth";
import httpStatus from "../../constants/httpStatus";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { signUp } = useAuth();

  const { errors, validateForm, onBlurField } = useSignUpFormValidator(form);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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

    const result = await signUp({
      email: form.email,
      password: form.password,
      username: form.username,
    });

    if (result?.status) {
      if (result.status === httpStatus.CONFLICT) {
        navigate("/login", { state: { autofill: form.email } });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="SignUp Form"
      className="mb-4 flex flex-col rounded bg-neutral-900 px-8 pb-8 pt-6 shadow-md"
    >
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
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onBlur={onBlurField}
        />
        {errors.email.dirty && errors.email.error ? (
          <p className="pt-2 italic  text-rose-500">{errors.email.message}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-100"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className={
            errors.username.dirty && errors.username.error
              ? `w-full appearance-none rounded border border-rose-500 bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600`
              : `w-full appearance-none rounded border bg-input-color px-3 py-2 text-gray-100 shadow focus-visible:outline-primary-color-600`
          }
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          onBlur={onBlurField}
        />
        {errors.username.dirty && errors.username.error ? (
          <p className="pt-2 italic  text-rose-500">
            {errors.username.message}
          </p>
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
          type={showPassword ? "text" : "password"}
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
        <div className="mt-2 flex items-center">
          <input
            id="showPassword"
            className="h-5 w-5  accent-primary-color"
            type="checkbox"
            name="showPassword"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setShowPassword(e.target.checked);
            }}
          />
          <label htmlFor="showPassword" className="px-1 text-gray-100 ">
            <span>Show Password</span>
          </label>
        </div>
      </div>
      <div>
        <button
          className="w-full rounded bg-primary-color-600 px-4 py-2 font-bold text-black hover:bg-primary-color-500"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
