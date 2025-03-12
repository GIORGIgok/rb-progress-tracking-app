import { CommentsIndicatorSVG } from "../../../assets/svg/comments-indicator";
import { MediumPriorityIndicatorSVG } from "../../../assets/svg/medium-priority-indicator";
import employee_img from "../../../assets/images/employee-test-img.jpeg";
import { shortenDepartmentName } from "../../../helpers/shorten-dep-name";
import { HighPriorityIndicatorSVG } from "../../../assets/svg/high-priority-indicator";
import { LowPriorityIndicatorSVG } from "../../../assets/svg/low-priority-indicator";
import { formatGeorgianDate } from "../../../helpers/ka-date-formatter";

export default function TaskCart({ task }) {
  return (
    <article
      className={`w-[381px] h-[217px] rounded-[15px] border p-[20px] text-[12px] ${
        task.status.id === 1
          ? "border-[#F7BC30]"
          : task.status.id === 2
          ? "border-[#FB5607]"
          : task.status.id === 3
          ? "border-[#FF006E]"
          : task.status.id === 4
          ? "border-[#3A86FF]"
          : ""
      }`}
    >
      <div className="flex justify-between mb-[28px]">
        <div className="flex items-center h-[26px] gap-[10px]">
          <div
            className={`flex items-center justify-center gap-[4px] border rounded-[4px] p-[4px] ${
              task.priority.id === 1
                ? "border-[#08A508] text-[#08A508]"
                : task.priority.id === 2
                ? "border-[#FFBE0B] text-[#FFBE0B]"
                : task.priority.id === 3
                ? "border-[#FA4D4D] text-[#FA4D4D]"
                : ""
            }`}
          >
            <figure className="w-[16px] h-[8px] flex items-center justify-center">
              {task.priority.id === 1 && <LowPriorityIndicatorSVG />}
              {task.priority.id === 2 && <MediumPriorityIndicatorSVG />}
              {task.priority.id === 3 && <HighPriorityIndicatorSVG />}
            </figure>
            <span className="font-[500] text-[12px]">{task.priority.name}</span>
          </div>

          <span
            className={`rounded-[15px] max-w-[110px] h-[24px] flex items-center justify-center text-[#ffffff] font-[400] px-[9px] py-[5px] ${
              task.department.id === 1
                ? "bg-[#FF66A8]"
                : task.department.id === 2
                ? "bg-[#89B6FF]"
                : task.department.id === 3
                ? "bg-[#FFD86D]"
                : task.department.id === 4
                ? "bg-[#FD9A6A]"
                : task.department.id === 5
                ? "bg-[#FB5607]"
                : task.department.id === 6
                ? "bg-[#08A508]"
                : "bg-[#FA4D4D]"
            }`}
          >
            {shortenDepartmentName(task.department.name)}
          </span>
        </div>
        <span className="flex items-center">
          {formatGeorgianDate(task.due_date)}
        </span>
      </div>

      <div className="w-[320px] h-[64px] text-[#212529] m-auto">
        <h4 className="text-[15px] font-[500] mb-[12px]">{task.name}</h4>
        <p className="text-[14px]">{task.description}</p>
      </div>

      <div className="w-full h-[31px] flex justify-between mt-[28px]">
        <figure className="object-cover">
          <img
            src={employee_img}
            alt="employee-img"
            className="rounded-full object-cover w-[31px] h-[31px]"
          />
        </figure>
        <div className="flex items-center justify-between gap-[4px]">
          <CommentsIndicatorSVG />
          <span className="ml-[4px] text-[14px]">{task.total_comments}</span>
        </div>
      </div>
    </article>
  );
}
