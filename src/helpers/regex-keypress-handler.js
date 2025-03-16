// prevent typing non-latin & georgian characters + numbers
export const handleKeyPress = (e) => {
  if (
    e.key === "Backspace" ||
    e.key === "Delete" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "Tab" ||
    e.key === "Enter" ||
    e.ctrlKey ||
    e.metaKey ||
    e.key === "Home" ||
    e.key === "End"
  ) {
    return;
  }

  if (!/^[a-zA-Zაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]$/.test(e.key)) {
    e.preventDefault();
  }
};
