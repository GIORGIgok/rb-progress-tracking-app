import { HighPriorityIndicatorSVG } from "../../assets/svg/high-priority-indicator";
import { LowPriorityIndicatorSVG } from "../../assets/svg/low-priority-indicator";
import { MediumPriorityIndicatorSVG } from "../../assets/svg/medium-priority-indicator";
import { shortenDepartmentName } from "../../helpers/shorten-dep-name";

export default function TaskDetailedInfo({ task }) {
  return (
    <article className="w-[715px] rounded-[15px] text-[12px] mb-[63px]">
      <div className="flex justify-between mb-[12px]">
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
      </div>

      <div className="w-full text-[#212529]">
        <h4 className="text-[34px] font-[600] mb-[26px]">{task.name}</h4>
        <p className="text-[18px] font-[400] leading-[150%]">
          {task.description}
        </p>
      </div>
    </article>
  );
}
