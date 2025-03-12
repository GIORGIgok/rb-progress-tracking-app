import { ArrowDownSvg } from "../../assets/svg/arrow-down";
import FinishedTasksBlock from "../../components/tasks-segregation-section/sections/finished-tasks/finished-tasks-block";
import InProgressTasksBlock from "../../components/tasks-segregation-section/sections/in-progress-tasks/in-progress-tasks-block";
import ReadyForTestBlock from "../../components/tasks-segregation-section/sections/ready-for-test-tasks/ready-tasks-block";
import TodoTasksBlock from "../../components/tasks-segregation-section/sections/to-do-tasks/to-do-tasks-block";

export default function AllTasksPage() {
  return (
    <main className="px-[120px]">
      <h2 className="text-[34px] font-[FiraGO] font-bold text-[#212529]">
        დავალებების გვერდი
      </h2>
      {/* SELECT DEPARTMENT */}
      <div className="w-[688px] h-[44px] mt-[52px] border-1 border-[#DEE2E6] rounded-[10px] flex items-center gap-[45px]">
        <div className="option flex justify-center items-center gap-[8px] w-[199px] hover:text-[#8338EC] hover:cursor-pointer group">
          <span>დეპარტამენტი</span>
          <ArrowDownSvg className="group-hover:fill-[#8338EC]" />
        </div>

        {/* SELECT PRIORITY */}
        <div className="option flex justify-center items-center gap-[8px] w-[199px] hover:text-[#8338EC] hover:cursor-pointer group">
          <span>პრიორიტეტი</span>
          <ArrowDownSvg className="group-hover:fill-[#8338EC]" />
        </div>

        {/* SELECT EMPLOYEE */}
        <div className="option flex justify-center items-center gap-[8px] w-[199px] hover:text-[#8338EC] hover:cursor-pointer group">
          <span>თანამშრომელი</span>
          <ArrowDownSvg className="group-hover:fill-[#8338EC]" />
        </div>
      </div>

      <section className="w-full mt-[79px] flex gap-[52px]">
        <TodoTasksBlock />

        <InProgressTasksBlock />

        <ReadyForTestBlock />

        <FinishedTasksBlock />
      </section>
    </main>
  );
}
