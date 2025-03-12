export const shortenDepartmentName = (name, maxLength = 15) => {
  const words = name.split(" ");
  if (name.length <= maxLength) {
    return name.length > maxLength
      ? name.slice(0, maxLength - 3) + "..."
      : name;
  }

  const abbreviated = words.map((word) => word.slice(0, 3) + ".");
  return abbreviated.join(" ");
};
