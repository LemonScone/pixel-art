import { ChangeEvent, FormEvent, useState } from "react";
import { useSignInFormValidator } from "../../hooks/useSignInFormValidator";
import useAuth from "../../hooks/useAuth";
import httpStatus from "../../constants/httpStatus";
import { NavLink, useLocation } from "react-router-dom";
import FormField from "../common/FormField";

const SignInForm = () => {
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.autofill ? location.state.autofill : "",
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
    <form onSubmit={handleSubmit} aria-label="SignIn Form">
      {unAuthorized && (
        <div className="mb-4 rounded bg-rose-500 p-2 text-gray-100">
          Sorry, we can't find an account with this email. Please try again
          or&nbsp;
          <NavLink to="/signup" className="underline">
            create a new account.
          </NavLink>
        </div>
      )}
      <FormField
        type="email"
        label="email"
        value={form.email}
        errors={errors.email}
        onChange={handleChange}
        onBlur={onBlurField}
      />
      <FormField
        type="password"
        label="password"
        value={form.password}
        errors={errors.password}
        onChange={handleChange}
        onBlur={onBlurField}
      />
      <div className="mt-8">
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
