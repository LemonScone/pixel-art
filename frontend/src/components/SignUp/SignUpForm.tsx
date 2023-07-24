import { ChangeEvent, FormEvent, useState } from "react";
import { useSignUpFormValidator } from "../../hooks/useSignUpFormValidator";
import useAuth from "../../hooks/useAuth";
import httpStatus from "../../constants/httpStatus";
import { useNavigate } from "react-router-dom";
import FormField from "../common/FormField";

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
    <form onSubmit={handleSubmit} aria-label="SignUp Form">
      <FormField
        type="text"
        label="email"
        value={form.email}
        errors={errors.email}
        onBlur={onBlurField}
        onChange={handleChange}
      />
      <FormField
        type="text"
        label="username"
        value={form.username}
        errors={errors.username}
        onBlur={onBlurField}
        onChange={handleChange}
      />
      <FormField
        type={showPassword ? "text" : "password"}
        label="password"
        value={form.password}
        errors={errors.password}
        onBlur={onBlurField}
        onChange={handleChange}
      />
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
      <div className="mt-8">
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
