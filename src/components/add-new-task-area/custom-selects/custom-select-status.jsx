import arrow_img from "../../../assets/images/arrow-down.png";
import { useState, useEffect } from "react";

export default function CustomSelectStatus({
  options,
  value,
  onChange,
  isOpenStatusOptions,
  setIsOpenStatusOptions,
}) {
  const [selectedValue, setSelectedValue] = useState(options[0]?.id);

  useEffect(() => {
    if (options.length > 0) {
      setSelectedValue(options[0].id);
    }
  }, [options]);

  useEffect(() => {
    if (value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value, selectedValue]);

  const handleToggle = () => {
    setIsOpenStatusOptions((prev) => !prev);
  };

  const handleSelect = (option) => {
    if (option && option.id) {
      onChange(option.id);
      setSelectedValue(option.id);
      setIsOpenStatusOptions(false);
    } else {
      console.error("Selected option is invalid", option);
    }
  };

  const selectedOption = options.find((option) => option.id === selectedValue);

  return (
    <div className="custom-select-container cursor-pointer">
      <div
        className="custom-select-box"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpenStatusOptions ? "true" : "false"}
      >
        <span className="flex items-center gap-[6px] text-[14px] font-[300]">
          {selectedOption ? (
            <>
              <span className="leading-normal">{selectedOption.name}</span>
            </>
          ) : (
            <>
              <span className="leading-normal">{options[0]?.name}</span>
            </>
          )}
        </span>
        <figure>
          <img
            src={arrow_img}
            alt="arrow"
            className={`size-[14px] transform ${
              isOpenStatusOptions ? "rotate-180" : ""
            }`}
          />
        </figure>
      </div>

      {/* DROPDOWN */}
      {isOpenStatusOptions && (
        <ul className="custom-select-options">
          {options.map((option) => (
            <li
              key={option.id}
              className="custom-select-option"
              onClick={() => handleSelect(option)}
            >
              <span className="leading-[150%] font-[300]">{option.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
