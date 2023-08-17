import { useState } from "react";
import { emailValidator, emptyValidator } from "../utils/validators";
import { FormFieldValidation } from "../types/FormFieldValidation";

type SignUpFormField<T> = {
  email: T;
  username: T;
  password: T;
};

const touchErrors = (errors: SignUpFormField<FormFieldValidation>) => {
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

export const useSignUpFormValidator = (form: SignUpFormField<string>) => {
  const [errors, setErrors] = useState({
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    username: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
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
    form: SignUpFormField<string>;
    field?: keyof SignUpFormField<string>;
    errors: SignUpFormField<FormFieldValidation>;
    forceTouchErrors?: boolean;
  }) => {
    let isValid = true;

    let nextErrors: SignUpFormField<FormFieldValidation> = JSON.parse(
      JSON.stringify(errors)
    );

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { email, username, password } = form;

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const message = emailValidator(email, "Email");
      nextErrors.email.error = !!message;
      nextErrors.email.message = message;
      if (message) {
        isValid = false;
      }
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const message = emptyValidator(password, "Password");
      nextErrors.password.error = !!message;
      nextErrors.password.message = message;
      if (message) {
        isValid = false;
      }
    }

    if (nextErrors.username.dirty && (field ? field === "username" : true)) {
      const message = emptyValidator(username, "Username");
      nextErrors.username.error = !!message;
      nextErrors.username.message = message;
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
