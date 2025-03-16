import "./styles/styles.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getAllStatuses } from "../../api/statuses/get-all-statuses";
import { getAllDepartments } from "../../api/departments/get-all-departments";
import { getAllPriorities } from "../../api/priorities/get-all-priorities";
import CustomSelectPriorities from "./custom-selects/custom-select-menu";
import CustomSelectStatus from "./custom-selects/custom-select-status";
import CustomSelectDepartment from "./custom-selects/custom-select-department";
import CustomSelectEmployee from "./custom-selects/custom-select-employee";
import { useNavigate } from "react-router-dom";
import { createNewTask } from "../../api/tasks/create-new-task";
import { getAllEmployees } from "../../api/epmloyees/get-all-employees";

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

  useEffect(() => {
    getAllStatuses().then(setStatuses).catch(console.error);
    getAllDepartments().then(setDepartments).catch(console.error);
    getAllEmployees().then(setEmployees).catch(console.error);
    getAllPriorities().then(setPriorities).catch(console.error);
  }, []);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 360);

  const todayString = today.toISOString().split("T")[0];
  const tomorrowString = tomorrow.toISOString().split("T")[0];
  const maxDateString = maxDate.toISOString().split("T")[0];

  const validationSchema = Yup.object({
    name: Yup.string()
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
    priority_id: Yup.string().required("სავალდებულო"),
    status_id: Yup.string().required("სავალდებულო"),
    department: Yup.string().required("სავალდებულო"),
    employee_id: Yup.string().required("სავალდებულო"),
    due_date: Yup.date()
      .min(todayString, "წარსული თარიღი არ შეიძლება")
      .required("სავალდებულო"),
  });

  const getInitialValues = () => {
    const savedFormData = localStorage.getItem("taskFormData");

    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          name: "",
          description: "",
          priority_id: "2",
          status_id: "1",
          department: "",
          employee_id: "",
          due_date: tomorrowString,
        };
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    try {
      await createNewTask(values);
      localStorage.removeItem("taskFormData");
      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error);
      setFieldError(
        "taskNotCreated",
        "დავალების შექმნა ვერ მოხერხდა. სცადეთ თავიდან."
      );
    } finally {
      setSubmitting(false);
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
        handleSubmit,
        setFieldTouched,
        errors,
        touched,
        isValid,
        dirty,
        isSubmitting,
      }) => {
        const filteredEmployees = values.department
          ? employees.filter(
              (employee) => employee.department.id === Number(values.department)
            )
          : [];

        useEffect(() => {
          setFieldValue("employee_id", "");
          setFieldTouched("employee_id", true);
        }, [values.department, setFieldValue]);

        const isEmployeeDisabled = !values.department;

        useEffect(() => {
          localStorage.setItem("taskFormData", JSON.stringify(values));
        }, [values]);

        return (
          <form onSubmit={handleSubmit}>
            <main className="add-new-task-container">
              <div className="float-left w-[40%]">
                {/* TITLE */}
                <div className="float-left">
                  <label htmlFor="name" className="label-heading">
                    სათაური*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`standard-input border ${
                      touched.name
                        ? errors.name
                          ? "border-[#FA4D4D]"
                          : "border-[#08A508]"
                        : "border-[#DEE2E6]"
                    }`}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={255}
                  />
                  <div className="mt-[6px]">
                    <p
                      className={`text-[10px] font-[350] mb-[2px] ${
                        values.name.length === 1
                          ? "text-[#FA4D4D]"
                          : values.name.length >= 2 &&
                            values.name.length <= 255 + 1
                          ? "text-[#28A745]"
                          : "text-[#6C757D]"
                      }`}
                    >
                      ✔ მინიმუმ 2 სიმბოლო
                    </p>
                    <p
                      className={`text-[10px] font-[350] ${
                        values.name.length > 255
                          ? "text-[#FA4D4D]"
                          : values.name.length > 0 && values.name.length <= 255
                          ? "text-[#28A745]"
                          : "text-[#6C757D]"
                      }`}
                    >
                      ✔ მაქსიმუმ 255 სიმბოლო
                    </p>
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
                    className={`description-input float-left border ${
                      touched.description
                        ? errors.description
                          ? "border-[#FA4D4D]"
                          : "border-[#08A508]"
                        : "border-[#DEE2E6]"
                    }`}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={255}
                  />
                  <div className="standard-input-info float-left">
                    <span
                      className={`text-[10px] font-[350] mb-[2px] ${
                        values.description.trim().split(/\s+/).length >= 4
                          ? "text-[#28A745]"
                          : values.description.trim().split(/\s+/).length < 4 &&
                            values.description.length > 0
                          ? "text-[#FA4D4D]"
                          : "text-[#6C757D]"
                      }`}
                    >
                      ✔ მინიმუმ 4 სიტყვა
                    </span>
                    <p
                      className={`text-[10px] font-[350] mb-[2px] ${
                        values.description.length <= 255 &&
                        values.description.length > 0
                          ? "text-[#28A745]"
                          : values.description.length === 0
                          ? "text-[#6C757D]"
                          : values.description.length > 255
                          ? "text-[#FA4D4D]"
                          : ""
                      }`}
                    >
                      ✔ მაქსიმუმ 255 სიმბოლო
                    </p>
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
                      value={values.priority_id}
                      isOpenPriorityOptions={isOpenPriorityOptions}
                      setIsOpenPriorityOptions={setIsOpenPriorityOptions}
                      onChange={(value) =>
                        handleChange({ target: { name: "priority_id", value } })
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
                      value={values.status_id}
                      isOpenStatusOptions={isOpenStatusOptions}
                      setIsOpenStatusOptions={setIsOpenStatusOptions}
                      onChange={(value) =>
                        handleChange({ target: { name: "status_id", value } })
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
                      setFieldValue("employee_id", "");
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
                    } ${isOpenEmployeeOptions ? "text-[#8338EC]!" : ""}`}
                  >
                    პასუხისმგებელი თანამშრომელი*
                  </span>
                  <CustomSelectEmployee
                    options={filteredEmployees}
                    value={values.employee_id}
                    onChange={(value) => setFieldValue("employee_id", value)}
                    isOpenEmployeeOptions={isOpenEmployeeOptions}
                    setIsOpenEmployeeOptions={setIsOpenEmployeeOptions}
                    disabled={
                      filteredEmployees.length === 0 || isEmployeeDisabled
                    }
                  />
                  <div className="standard-input-info float-left">
                    {values.department && (
                      <p className="text-[#FA4D4D]">
                        {filteredEmployees.length === 0 || !values.employee_id
                          ? errors.employee_id
                          : ""}
                      </p>
                    )}
                  </div>
                </div>

                {/* DATE */}
                <div className="float-left mt-[132px] w-full">
                  <label className="label-heading">დედლაინი*</label>
                  <input
                    type="date"
                    name="due_date"
                    className="block short-select"
                    value={values.due_date}
                    onChange={(e) => {
                      if (e.target.value < todayString) {
                        setFieldValue("due_date", todayString);
                      } else if (e.target.value > maxDateString) {
                        setFieldValue("due_date", maxDateString);
                      } else {
                        handleChange(e);
                      }
                    }}
                    onBlur={handleBlur}
                    min={todayString}
                    max={maxDateString}
                  />
                </div>

                {/* SUBMIT BTN */}
                <div className="w-[550px] float-left mt-[80px]">
                  <button
                    disabled={!(isValid && dirty) || isSubmitting}
                    type="submit"
                    className={`submit-btn float-right cursor-pointer opacity-50 ${
                      isValid && dirty ? "opacity-100" : ""
                    }`}
                  >
                    დავალების შექმნა
                  </button>
                  {errors.taskNotCreated && (
                    <div className="text-red-500 mt-4 w-full float-left text-right">
                      {errors.taskNotCreated}
                    </div>
                  )}
                </div>
              </div>
            </main>
          </form>
        );
      }}
    </Formik>
  );
}
