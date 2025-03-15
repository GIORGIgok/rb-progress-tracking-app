import arrow_img from "../../../assets/images/arrow-down.png";
import { useState, useEffect } from "react";

export default function CustomSelectEmployee({
  options,
  value,
  onChange,
  isOpenEmployeeOptions,
  setIsOpenEmployeeOptions,
  disabled,
}) {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    if (value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value, selectedValue]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpenEmployeeOptions((prev) => !prev);
    }
  };

  const handleSelect = (option) => {
    if (option && option.id && !disabled) {
      onChange(option.id);
      setSelectedValue(option.id);
      setIsOpenEmployeeOptions(false);
    } else {
      console.error(
        "Selected option is invalid or the select is disabled",
        option
      );
    }
  };

  const selectedOption = options.find((option) => option.id === selectedValue);

  return (
    <div
      className={`custom-select-container-wide ${disabled ? "disabled" : ""}`}
    >
      <div
        className="custom-select-box"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpenEmployeeOptions ? "true" : "false"}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        <span className="flex items-center gap-[6px] text-[14px] font-[300]">
          {selectedOption && (
            <>
              <span className="leading-normal">{`${selectedOption.name} ${selectedOption.surname}`}</span>
            </>
          )}
        </span>
        <figure>
          <img
            src={arrow_img}
            alt="arrow"
            className={`size-[14px] transform ${
              isOpenEmployeeOptions && options.length > 0 ? "rotate-180" : ""
            }`}
          />
        </figure>
      </div>

      {/* DROPDOWN */}
      {isOpenEmployeeOptions && !disabled && options.length > 0 && (
        <ul className="custom-select-options">
          {options.map((option) => (
            <li
              key={option.id}
              className="custom-select-option"
              onClick={() => handleSelect(option)}
            >
              <span className="leading-[150%] font-[300]">{`${option.name} ${option.surname}`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
