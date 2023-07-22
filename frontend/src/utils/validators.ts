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

export { emptyValidator, emailValidator };
