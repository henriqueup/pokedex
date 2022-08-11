export const capitalize = (value: string, locale = navigator.language) => {
  return value.charAt(0).toLocaleUpperCase(locale) + value.slice(1);
};
