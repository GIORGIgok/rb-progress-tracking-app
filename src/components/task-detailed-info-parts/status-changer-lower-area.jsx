import status_img from "../../assets/images/task-detailed/pie-chart.png";
import employee_img from "../../assets/images/task-detailed/employee.png";
import calendar_img from "../../assets/images/task-detailed/calendar.png";
import { useState } from "react";
import { shortenDepartmentName } from "../../helpers/shorten-dep-name";
import { formatGeorgianDate } from "../../helpers/ka-date-formatter";

export default function StatusChangerLowerArea({
  task,
  onStatusChange,
  loading,
}) {
  const [selectedStatus, setSelectedStatus] = useState(task.status.id);

  const handleChange = (event) => {
    const newStatusId = parseInt(event.target.value, 10);
    setSelectedStatus(newStatusId);
    onStatusChange(newStatusId);
  };
  return (
    <article className="w-[493px] h-[277px]">
      <h3 className="font-[500] text-[24px] mb-[18px] text-[#2A2A2A]">
        დავალების დეტალები
      </h3>
      <div className="w-[40%] h-full float-left text-[16px] font-[400]">
        {/*  */}
        <div className="h-[70px] flex items-start gap-[6px]">
          <figure>
            <img src={status_img} alt="status" />
          </figure>
          სტატუსი
        </div>
        {/*  */}
        <div className="h-[70px] flex items-start gap-[6px]">
          <figure>
            <img src={employee_img} alt="status" />
          </figure>
          თანამშრომელი
        </div>
        {/*  */}
        <div className="h-[70px] flex items-start gap-[6px]">
          <figure>
            <img src={calendar_img} alt="status" />
          </figure>
          დავალების ვადა
        </div>
        {/*  */}
      </div>
      <div className="w-[60%] h-full float-right pl-[70px]">
        <div className="h-[70px]">
          <select
            value={selectedStatus}
            onChange={handleChange}
            className="border p-[4px] rounded-[5px] border-[#CED4DA] outline-none"
            disabled={loading}
          >
            <option value="1">დასაწყები</option>
            <option value="2">პროგრესში</option>
            <option value="3">მზად ტესტირებისთვის</option>
            <option value="4">დასრულებული</option>
          </select>
        </div>
        <div className="h-[70px] flex gap-[12px] relative">
          <figure className="w-fit">
            <img
              src={task.employee.avatar}
              alt="employee-img"
              className="rounded-full object-cover w-[32px] h-[32px]"
            />
          </figure>
          <div className="flex flex-col items-center gap-[1px]">
            <span className=" text-[11px] font-[300] text-[#474747]">
              {shortenDepartmentName(task.employee.department.name)}
            </span>
            <span className="text-[14px] leading-[150%] text-[#0D0F10]">
              {`${task.employee.name} ${task.employee.surname}`}
            </span>
          </div>
        </div>
        <div className="h-[70px] ">{formatGeorgianDate(task.due_date)}</div>
      </div>
    </article>
  );
}
