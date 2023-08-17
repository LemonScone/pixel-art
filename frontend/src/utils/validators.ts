const emptyValidator = (input: string, label: string) => {
  if (!input) {
    return `${label} is required.`;
  }

  return "";
};

const emailValidator = (input: string, label: string) => {
  const empty = emptyValidator(input, label);

  if (empty) {
    return empty;
  } else {
    const emailPattern =
      /^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]{2,3})$/;
    if (!emailPattern.test(input)) {
      return "Please enter a valid email.";
    }

    return "";
  }
};

const passwordValidator = (input: string, label: string) => {
  const empty = emptyValidator(input, label);

  if (empty) {
    return empty;
  } else {
    const passwordPattern = /^[a-zA-Z0-9].{3,19}$/;

    if (!passwordPattern.test(input)) {
      return "Password must be at least 4 characters, no more than 20 characters, and contain letters and numbers.";
    }
    return "";
  }
};

export { emptyValidator, emailValidator, passwordValidator };
