import arrow_img from "../../../assets/images/arrow-down.png";
import { useState, useEffect } from "react";

export default function CustomSelectPriorities({
  options,
  value,
  onChange,
  isOpenPriorityOptions,
  setIsOpenPriorityOptions,
}) {
  const [selectedValue, setSelectedValue] = useState(options[1]?.id);

  useEffect(() => {
    if (value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value, selectedValue]);

  const handleToggle = () => {
    setIsOpenPriorityOptions((prev) => !prev);
  };

  const handleSelect = (option) => {
    if (option && option.id) {
      onChange(option.id);
      setSelectedValue(option.id);
      setIsOpenPriorityOptions(false);
    } else {
      console.error("Selected option is invalid", option);
    }
  };

  const selectedOption = options.find((option) => option.id === selectedValue);

  return (
    <div className="custom-select-container">
      <div
        className="custom-select-box"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpenPriorityOptions ? "true" : "false"}
      >
        <span className="flex items-center gap-[6px] text-[14px] font-[300]">
          {selectedOption ? (
            <>
              <img
                src={selectedOption.icon}
                alt="priority-icon"
                className="priority-icon"
              />
              <span className="leading-normal">{selectedOption.name}</span>
            </>
          ) : (
            <>
              <img
                src={options[1]?.icon}
                alt={options[1]?.name}
                className="priority-icon"
              />
              <span className="leading-normal">{options[1]?.name}</span>
            </>
          )}
        </span>
        <figure>
          <img
            src={arrow_img}
            alt="arrow"
            className={`size-[14px] transform ${
              isOpenPriorityOptions ? "rotate-180" : ""
            }`}
          />
        </figure>
      </div>

      {/* DROPDOWN */}
      {isOpenPriorityOptions && (
        <ul className="custom-select-options">
          {options.map((option) => (
            <li
              key={option.id}
              className="custom-select-option"
              onClick={() => handleSelect(option)}
            >
              <img
                src={option.icon}
                alt={option.name}
                className="priority-icon"
              />
              <span className="leading-[150%] font-[300]">{option.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
