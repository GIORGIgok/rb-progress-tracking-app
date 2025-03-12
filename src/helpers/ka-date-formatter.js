export const formatGeorgianDate = (dateString) => {
  const months = [
    "იანვ",
    "თებ",
    "მარ",
    "აპრ",
    "მაისი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექტ",
    "ოქტ",
    "ნოე",
    "დეკ",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};
