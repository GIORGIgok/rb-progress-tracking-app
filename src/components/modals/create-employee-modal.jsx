import "../../components/modals/styles/styles.css";
import { useModal } from "../../contexts/modal-context";
import close_img from "../../assets/images/close.png";
import upload_employee_img from "../../assets/images/upload-employee-avatar.png";
import remove_employee_avatar_img from "../../assets/images/remove-avatar-trash.png";
import ModalCustomSelectDepartment from "./custom-select/select-department";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllDepartments } from "../../api/departments/get-all-departments";
import { addEmployee } from "../../api/epmloyees/add-employee";
import { handleKeyPress } from "../../helpers/regex-keypress-handler";
import { getAllEmployees } from "../../api/epmloyees/get-all-employees";

export const CreateEmployeeModal = () => {
  const { isOpen, closeModal, modalData } = useModal();

  const [departments, setLocalDepartments] = useState([]);
  const [isOpenDepartmentOptions, setIsOpenDepartmentOptions] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState(null);

  useEffect(() => {
    getAllDepartments().then(setLocalDepartments).catch(console.error);
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო")
      .required("სახელი აუცილებელია"),
    surname: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო")
      .required("გვარი აუცილებელია"),
    department: Yup.string().required("დეპარტამენტის მითითება აუცილებელია"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      department: "",
      avatar: "",
    },
    validationSchema,
    validate: () => {
      const errors = {};
      if (avatar && avatar.size > 600 * 1024) {
        errors.avatar = "ფაილი უნდა იყოს არაუმეტეს 600KB";
      }
      return errors;
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("surname", values.surname);
        formData.append("department_id", values.department);

        if (avatar) {
          formData.append("avatar", avatar);
        }
        // console.log("FormData contents:");
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
        await addEmployee(formData);

        getAllEmployees().then(modalData).catch(console.error);

        resetForm();
        closeModal();
        setAvatar(null);
        setAvatarError(null);
      } catch (error) {
        console.error("Error adding employee:", error.message);
      }
    },
  });

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      closeModal();
      formik.resetForm();
      setAvatar(null);
      setAvatarError(null);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 600 * 1024) {
        setAvatar(file);
        setAvatarError(null);
        formik.setFieldValue("avatar", file);
      } else {
        setAvatarError("ფაილი უნდა იყოს არაუმეტეს 600KB");
        formik.setFieldError("avatar", "ფაილი უნდა იყოს არაუმეტეს 600KB");
      }
    } else {
      setAvatar(null);
      setAvatarError(null);
      formik.setFieldValue("avatar", null);
    }
  };

  const handleAvatarRemove = (e) => {
    e.stopPropagation();

    setAvatar(null);
    setAvatarError("ავატარი სავალდებულოა");
    formik.setFieldValue("avatar", null);
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar").click();
  };

  useEffect(() => {
    if (avatar === undefined) {
      setAvatar(null);
    }
  }, [avatar]);

  const isFormValid = formik.isValid && avatar;

  if (!isOpen) return null;

  return (
    <section className="modal-overlay" onClick={handleOverlayClick}>
      <form onSubmit={formik.handleSubmit} className="modal">
        <figure className="float-right">
          <img
            src={close_img}
            alt="close"
            className="size-[40px] cursor-pointer hover:brightness-90 transition-all duration-200 mb-[37px]"
            onClick={() => {
              closeModal();
              formik.resetForm();
              setAvatar(null);
              setAvatarError(null);
            }}
          />
        </figure>

        <div className="float-left w-full h-[589px]">
          <h2 className="font-[500] text-[#212529] text-[32px] text-center">
            თანამშრომლის დამატება
          </h2>

          {/* NAME&SURNAME */}
          <div className="mt-[45px] flex flex-col gap-[45px]">
            <div className="h-[102px]">
              {/* NAME */}
              <div className="float-left">
                <label htmlFor="name" className="modal-label-heading">
                  სახელი*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`modal-standard-input border ${
                    formik.touched.name
                      ? formik.errors.name
                        ? "border-[#FA4D4D]"
                        : "border-[#08A508]"
                      : "border-[#DEE2E6]"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  onKeyDown={handleKeyPress}
                  maxLength={255}
                />

                <div className="mt-[6px]">
                  <p
                    className={`text-[10px] font-[350] mb-[2px] ${
                      formik.values.name.length === 1
                        ? "text-[#FA4D4D]"
                        : formik.values.name.length >= 2 &&
                          formik.values.name.length <= 255 + 1
                        ? "text-[#28A745]"
                        : "text-[#6C757D]"
                    }`}
                  >
                    ✔ მინიმუმ 2 სიმბოლო
                  </p>
                  <p
                    className={`text-[10px] font-[350] ${
                      formik.values.name.length > 255
                        ? "text-[#FA4D4D]"
                        : formik.values.name.length > 0 &&
                          formik.values.name.length <= 255
                        ? "text-[#28A745]"
                        : "text-[#6C757D]"
                    }`}
                  >
                    ✔ მაქსიმუმ 255 სიმბოლო
                  </p>
                </div>
              </div>

              {/* SURNAME */}
              <div className="float-right">
                <label htmlFor="surname" className="modal-label-heading">
                  გვარი*
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  className={`modal-standard-input border ${
                    formik.touched.surname
                      ? formik.errors.surname
                        ? "border-[#FA4D4D]"
                        : "border-[#08A508]"
                      : "border-[#DEE2E6]"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surname}
                  onKeyDown={handleKeyPress}
                  maxLength={255}
                />

                <div className="mt-[6px]">
                  <p
                    className={`text-[10px] font-[350] mb-[2px] ${
                      formik.values.surname.length === 1
                        ? "text-[#FA4D4D]"
                        : formik.values.surname.length >= 2
                        ? "text-[#28A745]"
                        : "text-[#6C757D]"
                    }`}
                  >
                    ✔ მინიმუმ 2 სიმბოლო
                  </p>
                  <p
                    className={`text-[10px] font-[350] ${
                      formik.values.surname.length > 255
                        ? "text-[#FA4D4D]"
                        : formik.values.surname.length > 0 &&
                          formik.values.surname.length <= 255
                        ? "text-[#28A745]"
                        : "text-[#6C757D]"
                    }`}
                  >
                    ✔ მაქსიმუმ 255 სიმბოლო
                  </p>
                </div>
              </div>
            </div>

            {/* AVATAR */}
            <div className="w-full">
              <span className="modal-label-heading">ავატარი*</span>
              <div
                className={`modal-avatar-upload-container border-[2px] border-dashed ${
                  !avatar && !avatarError
                    ? "border-[#CED4DA]"
                    : avatarError
                    ? "border-[#FA4D4D]"
                    : "border-[#28A745]"
                }`}
              >
                <div className="relative">
                  <figure onClick={handleAvatarClick}>
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="uploaded avatar"
                        className="rounded-full size-[88px]"
                      />
                    ) : (
                      <img
                        src={upload_employee_img}
                        alt="upload employee"
                        className="rounded-full size-[88px]"
                      />
                    )}
                    {avatar && (
                      <div className="avatar-images-wrapper">
                        <img
                          src={remove_employee_avatar_img}
                          alt="remove avatar"
                          className="size-[14px]"
                          onClick={handleAvatarRemove}
                        />
                      </div>
                    )}
                  </figure>
                  <input
                    name="avatar"
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="file-input hidden"
                  />
                </div>
              </div>
              {formik.errors.avatar ? (
                <div className="text-[#FA4D4D]">
                  <p>{formik.errors.avatar}</p>
                </div>
              ) : (
                <div className="modal-input-info">
                  <p>ფაილი უნდა იყოს არაუმეტეს 600KB</p>
                </div>
              )}
            </div>

            {/* DEPARTMENT */}
            <div className="w-full">
              <span
                className={`modal-label-heading ${
                  isOpenDepartmentOptions ? "text-[#8338EC]" : ""
                }`}
              >
                დეპარტამენტი*
              </span>
              <ModalCustomSelectDepartment
                options={departments}
                value={formik.values.department}
                onChange={formik.setFieldValue}
                isOpenDepartmentOptions={isOpenDepartmentOptions}
                setIsOpenDepartmentOptions={setIsOpenDepartmentOptions}
                errors={formik.errors.department}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="float-right">
            <button
              onClick={() => {
                closeModal();
                formik.resetForm();
                setAvatar(null);
                setAvatarError(false);
              }}
              className="button-dismiss-adding"
            >
              გაუქმება
            </button>

            <button
              disabled={!formik.isValid || !avatar}
              type="submit"
              className={`button-add-new-employee mt-[25px] ${
                !isFormValid ? "opacity-50" : ""
              }`}
            >
              დაამატე თანამშრომელი
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
