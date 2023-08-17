import { ChangeEvent, FormEvent, useState } from "react";
import FormField from "./common/FormField";
import { useResetPasswordFormValidator } from "../hooks/useResetPasswordFormValidator";
import { toast, useResetPasswordMutation } from "../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [notMatch, setNotMatch] = useState(false);

  const { errors, validateForm, onBlurField } =
    useResetPasswordFormValidator(form);

  const [resetPassword] = useResetPasswordMutation();

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

    if (form.password !== form.confirmPassword) {
      setNotMatch(true);
      return;
    }

    const result = await resetPassword({
      token: searchParam.get("token") || "",
      password: form.password,
    });

    if ("error" in result) {
      dispatch(
        toast({
          type: "failure",
          message: "An unknown error occurred. Please try again.",
        })
      );
    } else {
      dispatch(toast({ type: "success", message: "Password Changed!" }));
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Reset Password Form">
      {notMatch && (
        <div className="my-4 rounded bg-rose-500 p-2 text-gray-100">
          Password confirmation doesn't match the password.
        </div>
      )}
      <FormField
        type="password"
        label="password"
        value={form.password}
        errors={errors.password}
        onBlur={onBlurField}
        onChange={handleChange}
      />
      <FormField
        type="password"
        label="confirm password"
        value={form.confirmPassword}
        errors={errors.confirmPassword}
        onBlur={onBlurField}
        onChange={handleChange}
      />
      <div className="mt-8">
        <button
          className="w-full rounded bg-primary-color-600 px-4 py-2 font-bold text-black hover:bg-primary-color-500"
          type="submit"
        >
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
