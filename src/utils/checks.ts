export const validateUrl = (value: string) => {
  return (
    value.toLowerCase().startsWith('http://') ||
    value.toLowerCase().startsWith('https://')
  );
};
