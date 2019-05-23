export const currentYear = () => {
  const date = new Date();

  return date.getFullYear();
};

export const generateYears = (count = 50) => {
  const thisYear = currentYear();
  return Array(count)
    .fill()
    .map((_, i) => thisYear - i);
};
