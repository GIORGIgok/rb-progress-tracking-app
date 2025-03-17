import { ArrowDownSvg } from "../../assets/svg/arrow-down";
import FiltrationDropdown from "../../components/dropdowns/filtration-dropdown";
import FinishedTasksBlock from "../../components/tasks-segregation-section/sections/finished-tasks/finished-tasks-block";
import InProgressTasksBlock from "../../components/tasks-segregation-section/sections/in-progress-tasks/in-progress-tasks-block";
import ReadyForTestBlock from "../../components/tasks-segregation-section/sections/ready-for-test-tasks/ready-tasks-block";
import TodoTasksBlock from "../../components/tasks-segregation-section/sections/to-do-tasks/to-do-tasks-block";
import clear_filter_img from "../../assets/images/clear-filter.png";
import { useEffect, useState } from "react";
import { getAllDepartments } from "../../api/departments/get-all-departments";
import { getAllPriorities } from "../../api/priorities/get-all-priorities";
import { getAllEmployees } from "../../api/epmloyees/get-all-employees";
import { useLocation } from "react-router-dom";

export default function AllTasksPage() {
  const location = useLocation();

  const savedFilters = JSON.parse(localStorage.getItem("filters")) || {
    department: [],
    priority: [],
    employee: null,
  };

  const [filters, setFilters] = useState(savedFilters);
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsRes = await getAllDepartments();
        const prioritiesRes = await getAllPriorities();
        const employeesRes = await getAllEmployees();

        setDepartments(departmentsRes);
        setPriorities(prioritiesRes);
        setEmployees(employeesRes);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));

    const newActiveFilters = [];

    if (filters.department && filters.department.length > 0) {
      filters.department.forEach((depId) => {
        const dept = departments.find((d) => d.id === depId);
        if (dept) {
          newActiveFilters.push({
            type: "department",
            id: dept.id,
            name: dept.name,
          });
        }
      });
    }

    if (filters.priority && filters.priority.length > 0) {
      filters.priority.forEach((prioId) => {
        const prio = priorities.find((p) => p.id === prioId);
        if (prio) {
          newActiveFilters.push({
            type: "priority",
            id: prio.id,
            name: prio.name,
          });
        }
      });
    }

    if (filters.employee) {
      newActiveFilters.push({
        type: "employee",
        id: filters.employee.id,
        name: filters.employee.name,
      });
    }

    setActiveFilters(newActiveFilters);
  }, [filters, departments, priorities]);

  const clearFilters = () => {
    const newFilters = {
      department: [],
      priority: [],
      employee: null,
    };
    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
  };

  const removeFilter = (type, id) => {
    if (type === "department") {
      setFilters((prev) => ({
        ...prev,
        department: prev.department.filter((depId) => depId !== id),
      }));
    } else if (type === "priority") {
      setFilters((prev) => ({
        ...prev,
        priority: prev.priority.filter((prioId) => prioId !== id),
      }));
    } else if (type === "employee") {
      setFilters((prev) => ({
        ...prev,
        employee: null,
      }));
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("filters");
    };
  }, [location.pathname]);

  return (
    <main className="px-[120px] mb-[151px]">
      <h2 className="text-[34px] font-[FiraGO] font-bold text-[#212529]">
        დავალებების გვერდი
      </h2>
      {/* SELECT DEPARTMENT */}
      <div className="relative cursor-pointer w-[688px] h-[44px] mt-[52px] border-1 border-[#DEE2E6] rounded-[10px] flex items-center gap-[45px]">
        <div className="group h-[100%] hover:text-[#8338EC] flex justify-center items-center gap-[8px] w-[199px] hover:cursor-pointer">
          <span>დეპარტამენტი</span>
          <ArrowDownSvg className="group-hover:fill-[#8338EC] rotate-180 group-hover:rotate-0 transition-transform duration-100" />

          <FiltrationDropdown
            data={departments}
            selectedFilters={filters.department}
            onSelectFilter={(selected) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                department: selected,
              }))
            }
          />
        </div>

        {/* SELECT PRIORITY */}
        <div className="group h-[100%] hover:text-[#8338EC] flex justify-center items-center gap-[8px] w-[199px] hover:cursor-pointer">
          <span>პრიორიტეტი</span>
          <ArrowDownSvg className="group-hover:fill-[#8338EC] rotate-180 group-hover:rotate-0 transition-transform duration-100" />

          <FiltrationDropdown
            data={priorities}
            selectedFilters={filters.priority}
            onSelectFilter={(selected) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                priority: selected,
              }))
            }
          />
        </div>

        {/* SELECT EMPLOYEE */}
        <div className="group h-[100%] hover:text-[#8338EC] flex justify-center items-center gap-[8px] w-[199px] hover:cursor-pointer">
          <span>თანამშრომელი</span>
          <ArrowDownSvg className="group-hover:fill-[#8338EC] rotate-180 group-hover:rotate-0 transition-transform duration-100" />
          <FiltrationDropdown
            data={employees}
            selectedFilters={filters.employee ? [filters.employee.id] : []}
            onSelectFilter={(selected) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                employee:
                  selected.length > 0
                    ? employees.find((emp) => emp.id === selected[0])
                    : null,
              }))
            }
            isSingleSelect={true}
          />
        </div>
      </div>

      <div className="mt-[36px] min-h-[35px] w-full flex flex-wrap gap-[8px] text-[14px] text-[#343A40]">
        {/* Active filter chips */}
        {activeFilters.map((filter) => (
          <div
            key={`${filter.type}-${filter.id}`}
            className="hover:cursor-pointer px-[10px] py-[6px] flex items-center gap-[4px] rounded-[43px] border-1 border-[#CED4DA] hover:border-[#959b9f] max-w-fit"
            onClick={() => removeFilter(filter.type, filter.id)}
          >
            <span>{filter.name}</span>
            <figure>
              <img src={clear_filter_img} alt="clear" className="size-[14px]" />
            </figure>
          </div>
        ))}

        {activeFilters.length > 0 && (
          <span
            className="hover:cursor-pointer flex items-center hover:text-[#8338ec] ml-[8px]"
            onClick={clearFilters}
          >
            გასუფთავება
          </span>
        )}
      </div>

      <section className={`w-full flex gap-[52px] mt-[34px]`}>
        <TodoTasksBlock filters={filters} />
        <InProgressTasksBlock filters={filters} />
        <ReadyForTestBlock filters={filters} />
        <FinishedTasksBlock filters={filters} />
      </section>
    </main>
  );
}
