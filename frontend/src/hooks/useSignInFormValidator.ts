import { useState } from "react";
import { emptyValidator } from "../utils/validators";

type FormFieldValidation = {
  dirty: boolean;
  error: boolean;
  message: string;
};

type SignInFormField<T> = {
  id: T;
  password: T;
};

const touchErrors = (errors: SignInFormField<FormFieldValidation>) => {
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

export const useSignInFormValidator = (form: SignInFormField<string>) => {
  const [errors, setErrors] = useState({
    id: {
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
    form: SignInFormField<string>;
    field?: keyof SignInFormField<string>;
    errors: SignInFormField<FormFieldValidation>;
    forceTouchErrors?: boolean;
  }) => {
    let isValid = true;

    let nextErrors: SignInFormField<FormFieldValidation> = JSON.parse(
      JSON.stringify(errors)
    );

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { id, password } = form;

    if (nextErrors.id.dirty && (field ? field === "id" : true)) {
      const message = emptyValidator(id, "ID");
      nextErrors.id.error = !!message;
      nextErrors.id.message = message;
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