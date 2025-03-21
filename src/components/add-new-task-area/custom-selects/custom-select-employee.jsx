import arrow_img from "../../../assets/images/arrow-down.png";
import { useState, useEffect } from "react";
import add_employee_img from "../../../assets/images/for-select-add-employee.png";

export default function CustomSelectEmployee({
  options,
  value,
  onChange,
  isOpenEmployeeOptions,
  setIsOpenEmployeeOptions,
  disabled,
  modalOpener,
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
    <div className="custom-select-container-wide">
      <div
        className={`custom-select-box ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpenEmployeeOptions ? "true" : "false"}
      >
        <span className="flex items-center gap-[6px] text-[14px] font-[300]">
          {selectedOption && (
            <>
              <figure>
                <img
                  src={selectedOption.avatar}
                  alt="employee-avatar"
                  className="size-[28px] rounded-full object-cover"
                />
              </figure>
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
          <li className="custom-select-option" onClick={modalOpener}>
            <figure>
              <img
                src={add_employee_img}
                alt="employee-avatar"
                className="size-[18px] rounded-full object-cover"
              />
            </figure>
            <span className="font-[400] text-[#8338EC]">
              დაამატე თანამშრომელი
            </span>
          </li>
          {options.map((option) => (
            <li
              key={option.id}
              className="custom-select-option"
              onClick={() => handleSelect(option)}
            >
              <figure>
                <img
                  src={option.avatar}
                  alt="employee-avatar"
                  className="size-[28px] rounded-full object-cover"
                />
              </figure>
              <span className="leading-[150%] font-[300]">{`${option.name} ${option.surname}`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
