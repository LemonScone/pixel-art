import { useState } from "react";
import { emailValidator } from "../utils/validators";

type FormFieldValidation = {
  dirty: boolean;
  error: boolean;
  message: string;
};

type ForgotPasswordFormField<T> = {
  email: T;
};

const touchErrors = (errors: ForgotPasswordFormField<FormFieldValidation>) => {
  return Object.entries(errors).reduce(
    (acc, [field, fieldError]) => {
      acc[field as keyof typeof errors] = {
        ...fieldError,
        dirty: true,
      };
      return acc;
    },
    { ...errors }
  );
};

export const useForgotPasswordFormValidator = (
  form: ForgotPasswordFormField<string>
) => {
  const [errors, setErrors] = useState({
    email: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({
    form,
    field,
    errors,
    forceTouchErrors = false,
  }: {
    form: ForgotPasswordFormField<string>;
    field?: keyof ForgotPasswordFormField<string>;
    errors: ForgotPasswordFormField<FormFieldValidation>;
    forceTouchErrors?: boolean;
  }) => {
    let isValid = true;

    let nextErrors: ForgotPasswordFormField<FormFieldValidation> = JSON.parse(
      JSON.stringify(errors)
    );

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { email } = form;

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const message = emailValidator(email, "Email");
      nextErrors.email.error = !!message;
      nextErrors.email.message = message;
      if (message) {
        isValid = false;
      }
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const field = e.target.name as keyof typeof errors;
      const fieldError = errors[field];

      if (fieldError.dirty) {
        return;
      }

      const updatedErrors = {
        ...errors,
        [field]: {
          ...errors[field],
          dirty: true,
        },
      };

      validateForm({ form, field, errors: updatedErrors });
    }
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
