import { ChangeEvent, FormEvent, useState } from "react";
import { useSignUpFormValidator } from "../../hooks/useSignUpFormValidator";

const SignUpForm = () => {
  const [form, setForm] = useState({
    id: "",
    username: "",
    password: "",
  });

  const { errors, validateForm, onBlurField } = useSignUpFormValidator(form);

  const [showPassword, setShowPassword] = useState(false);

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
