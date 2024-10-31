export const getRootBaseValue = (varName) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const varColor = rootStyles.getPropertyValue(varName).trim();
  return varColor;
};
