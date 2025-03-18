export default function FiltrationDropdown({
  data,
  selectedFilters = [],
  onSelectFilter,
  isSingleSelect = false,
}) {
  const handleCheckboxChange = (value) => {
    if (isSingleSelect) {
      onSelectFilter(selectedFilters.includes(value) ? [] : [value]);
    } else {
      // for multi-select
      const updatedFilters = selectedFilters.includes(value)
        ? selectedFilters.filter((item) => item !== value)
        : [...selectedFilters, value];

      onSelectFilter(updatedFilters);
    }
  };

  return (
    <div className="absolute w-[688px] h-auto left-[0px] top-[42px] bg-transparent group-hover:block hidden cursor-auto">
      <div
        className={`text-[#212529] mt-[8px] w-full h-full bg-[#ffffff] border-[1px] border-[#8338EC] rounded-[10px] px-[30px] py-[40px] ${
          data.length > 0 ? "block" : "hidden"
        }`}
      >
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-[10px] mb-[23.5px]"
            >
              <input
                type="checkbox"
                id={`${item.id}-${item.name}`}
                checked={selectedFilters.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
                className="custom-checkbox"
              />
              <label
                htmlFor={`${item.id}-${item.name}`}
                className="text-[16px] text-[#212529] cursor-pointer"
              >
                {item.name}
                {item.surname && ` ${item.surname}`}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}
