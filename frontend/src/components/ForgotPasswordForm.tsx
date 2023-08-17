import { ChangeEvent, FormEvent, useState } from "react";
import FormField from "./common/FormField";
import { useForgotPasswordFormValidator } from "../hooks/useForgotPasswordFormValidator";
import { useForgotPasswordMutation } from "../store";
import httpStatus from "../constants/httpStatus";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [sent, setSent] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);

  const [form, setForm] = useState({
    email: "",
  });

  const { errors, validateForm, onBlurField } =
    useForgotPasswordFormValidator(form);

  const [forgotPassword] = useForgotPasswordMutation();

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

    const result = await forgotPassword({ email: form.email });
    if ("error" in result && "status" in result.error) {
      if (result.error.status === httpStatus.NOT_FOUND) {
        setEmailNotFound(true);
      }
    } else {
      setSent(true);
    }
  };

  return (
    <div className="mt-4">
      {sent ? (
        <div className="flex flex-col">
          <p className="mb-3 break-words text-gray-100">
            Check your email for a link to reset your password. If it doesn’t
            appear within a few minutes, check your spam folder.
          </p>
          <Link
            to="/login"
            className="w-full rounded bg-primary-color-600 px-4 py-2 text-center font-bold text-black hover:bg-primary-color-500"
          >
            Return to Sign in
          </Link>
        </div>
      ) : (
        <>
          {emailNotFound && (
            <div className="mb-4 rounded bg-rose-500 p-2 text-gray-100">
              No account found for this email address.
            </div>
          )}
          <p className="text-gray-100">
            We will send you an email with instructions on how to reset your
            password.
          </p>

          <form onSubmit={handleSubmit} aria-label="Forgot Password Form">
            <FormField
              type="email"
              label="email"
              value={form.email}
              errors={errors.email}
              onChange={handleChange}
              onBlur={onBlurField}
            />
            <div className="mt-8">
              <button
                className="w-full rounded bg-primary-color-600 px-4 py-2 font-bold text-black hover:bg-primary-color-500"
                type="submit"
              >
                Email Me
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
