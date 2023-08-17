import { useState } from "react";
import { emptyValidator, passwordValidator } from "../utils/validators";
import { FormFieldValidation } from "../types/FormFieldValidation";

type ResetPasswordForm<T> = {
  password: T;
  confirmPassword: T;
};

const touchErrors = (errors: ResetPasswordForm<FormFieldValidation>) => {
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

export const useResetPasswordFormValidator = (
  form: ResetPasswordForm<string>
) => {
  const [errors, setErrors] = useState({
    password: {
      dirty: false,
      error: false,
      message: "",
    },
    confirmPassword: {
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
    form: ResetPasswordForm<string>;
    field?: keyof ResetPasswordForm<string>;
    errors: ResetPasswordForm<FormFieldValidation>;
    forceTouchErrors?: boolean;
  }) => {
    let isValid = true;

    let nextErrors: ResetPasswordForm<FormFieldValidation> = JSON.parse(
      JSON.stringify(errors)
    );

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { password, confirmPassword } = form;

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const message = passwordValidator(password, "Password");
      nextErrors.password.error = !!message;
      nextErrors.password.message = message;
      if (message) {
        isValid = false;
      }
    }

    if (
      nextErrors.confirmPassword.dirty &&
      (field ? field === "confirmPassword" : true)
    ) {
      const message = emptyValidator(confirmPassword, "Confirm Password");
      nextErrors.confirmPassword.error = !!message;
      nextErrors.confirmPassword.message = message;
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
