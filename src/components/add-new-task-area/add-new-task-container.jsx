import "./styles/styles.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getAllStatuses } from "../../api/statuses/get-all-statuses";
import { getAllDepartments } from "../../api/departments/get-all-departments";
import { getAllEmployees } from "../../api/epmloyees/get-all-employees";
import { getAllPriorities } from "../../api/priorities/get-all-priorities";
import CustomSelectPriorities from "./custom-selects/custom-select-menu";
import CustomSelectStatus from "./custom-selects/custom-select-status";
import CustomSelectDepartment from "./custom-selects/custom-select-department";
import CustomSelectEmployee from "./custom-selects/custom-select-employee";
import { useNavigate } from "react-router-dom";

export default function AddNewTaskContainer() {
  const navigate = useNavigate();
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [isOpenPriorityOptions, setIsOpenPriorityOptions] = useState(false);
  const [isOpenStatusOptions, setIsOpenStatusOptions] = useState(false);
  const [isOpenDepartmentOptions, setIsOpenDepartmentOptions] = useState(false);
  const [isOpenEmployeeOptions, setIsOpenEmployeeOptions] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 5);
  const maxDateString = maxDate.toISOString().split("T")[0];

  useEffect(() => {
    getAllStatuses().then(setStatuses).catch(console.error);
    getAllDepartments().then(setDepartments).catch(console.error);
    getAllEmployees().then(setEmployees).catch(console.error);
    getAllPriorities().then(setPriorities).catch(console.error);
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო")
      .required("სავალდებულო"),
    description: Yup.string()
      .notRequired()
      .max(255, "მაქსიმუმ 255 სიმბოლო")
      .test("min-words", "მინიმუმ 4 სიტყვა", (value) => {
        if (value && value.trim()) {
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount >= 4;
        }
        return true;
      }),
    priority: Yup.string().required("სავალდებულო"),
    status: Yup.string().required("სავალდებულო"),
    department: Yup.string().required("სავალდებულო"),
    responsibleEmployee: Yup.string().required("სავალდებულო"),
    deadline: Yup.date()
      .min(new Date(), "წარსული თარიღი არ შეიძლება")
      .required("სავალდებულო"),
  });

  const getInitialValues = () => {
    const savedFormData = localStorage.getItem("taskFormData");
    if (savedFormData) {
      return JSON.parse(savedFormData);
    }
    return {
      title: "",
      description: "",
      priority: "",
      status: "",
      department: "",
      responsibleEmployee: "",
      deadline: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    };
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      await createTask(values);

      localStorage.removeItem("taskFormData");

      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error);
      setSubmissionError(
        "დავალების შექმნა ვერ მოხერხდა. გთხოვთ, სცადოთ თავიდან."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        errors,
        touched,
        isValid,
        dirty,
      }) => {
        const filteredEmployees = values.department
          ? employees.filter(
              (employee) => employee.department.id === Number(values.department)
            )
          : [];

        useEffect(() => {
          setFieldValue("responsibleEmployee", "");
        }, [values.department, setFieldValue]);
        const isEmployeeDisabled = !values.department;

        useEffect(() => {
          localStorage.setItem("taskFormData", JSON.stringify(values));
        }, [values]);

        return (
          <form>
            <main className="add-new-task-container">
              <div className="float-left w-[40%]">
                {/* TITLE */}
                <div className="float-left">
                  <label htmlFor="title" className="label-heading">
                    სათაური*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={`standard-input border ${
                      touched.title
                        ? errors.title
                          ? "border-[#FA4D4D]"
                          : "border-[#08A508]"
                        : "border-[#DEE2E6]"
                    }`}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="standard-input-info">
                    {touched.title && errors.title ? (
                      <p className="text-red-500">{errors.title}</p>
                    ) : (
                      <p>მინიმუმ 2 სიმბოლო</p>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="float-left my-[57px]">
                  <label htmlFor="description" className="label-heading">
                    აღწერა
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className={`description-input border ${
                      touched.description
                        ? errors.description
                          ? "border-[#FA4D4D]"
                          : "border-[#08A508]"
                        : "border-[#DEE2E6]"
                    }`}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="standard-input-info h-[49px]">
                    {touched.description && errors.description ? (
                      <p className="text-red-500">{errors.description}</p>
                    ) : (
                      <p>არასავალდებულო</p>
                    )}
                  </div>
                </div>

                {/* PRIORITIES & STATUS */}
                <div className="float-left w-full">
                  <div className="w-[50%] float-left">
                    <span
                      className={`label-heading text-[#343A40] ${
                        isOpenPriorityOptions ? "text-[#8338EC]" : ""
                      }`}
                    >
                      პრიორიტეტი*
                    </span>
                    <CustomSelectPriorities
                      options={priorities}
                      value={values.priority}
                      isOpenPriorityOptions={isOpenPriorityOptions}
                      setIsOpenPriorityOptions={setIsOpenPriorityOptions}
                      onChange={(value) =>
                        handleChange({ target: { name: "priority", value } })
                      }
                    />
                  </div>

                  <div className="w-[50%] float-right h-[350px]">
                    <span
                      className={`label-heading text-[#343A40] ${
                        isOpenStatusOptions ? "text-[#8338EC]" : ""
                      }`}
                    >
                      სტატუსი*
                    </span>
                    <CustomSelectStatus
                      options={statuses}
                      value={values.status}
                      isOpenStatusOptions={isOpenStatusOptions}
                      setIsOpenStatusOptions={setIsOpenStatusOptions}
                      onChange={(value) =>
                        handleChange({ target: { name: "status", value } })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="float-right w-[60%] pl-[141px]">
                {/* DEPARTMENT */}
                <div className="w-full float-left">
                  <span
                    className={`label-heading text-[#343A40] ${
                      isOpenDepartmentOptions ? "text-[#8338EC]" : ""
                    }`}
                  >
                    დეპარტამენტი*
                  </span>
                  <CustomSelectDepartment
                    options={departments}
                    value={values.department}
                    isOpenDepartmentOptions={isOpenDepartmentOptions}
                    setIsOpenDepartmentOptions={setIsOpenDepartmentOptions}
                    onChange={(value) => {
                      setFieldValue("department", value);
                      setFieldValue("responsibleEmployee", "");
                    }}
                  />
                </div>

                {/* RESPONSIBLE EMPLOYEE */}
                <div className="mt-[94px] float-left">
                  <span
                    className={`label-heading custom-label-bright-text ${
                      values.department && filteredEmployees.length > 0
                        ? "custom-label-dark-text"
                        : ""
                    }`}
                  >
                    პასუხისმგებელი თანამშრომელი*
                  </span>
                  <CustomSelectEmployee
                    options={filteredEmployees}
                    value={values.responsibleEmployee}
                    onChange={(value) =>
                      setFieldValue("responsibleEmployee", value)
                    }
                    isOpenEmployeeOptions={isOpenEmployeeOptions}
                    setIsOpenEmployeeOptions={setIsOpenEmployeeOptions}
                    disabled={isEmployeeDisabled}
                  />
                </div>

                {/* DATE */}
                <div className="float-left mt-[210px] w-full">
                  <label className="label-heading">დედლაინი*</label>
                  <input
                    type="date"
                    name="deadline"
                    className="block short-select"
                    value={values.deadline}
                    onChange={(e) => {
                      if (e.target.value < today) {
                        setFieldValue("deadline", today);
                      } else if (e.target.value > maxDateString) {
                        setFieldValue("deadline", maxDateString);
                      } else {
                        handleChange(e);
                      }
                    }}
                    onBlur={handleBlur}
                    min={today}
                    max={maxDateString}
                  />
                </div>

                {/* SUBMIT BTN */}
                <div className="w-[550px] float-left mt-[80px]">
                  <button
                    disabled={!isValid}
                    type="submit"
                    className={`submit-btn float-right cursor-pointer opacity-50 ${
                      isValid && dirty ? "opacity-100" : ""
                    }`}
                  >
                    დავალების შექმნა
                  </button>
                </div>
              </div>
            </main>
          </form>
        );
      }}
    </Formik>
  );
}
