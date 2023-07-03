const emptyValidator = (input: string, label: string) => {
  if (!input) {
    return `${label} is required.`;
  }

  return "";
};

export { emptyValidator };
