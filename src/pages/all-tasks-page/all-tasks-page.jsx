import { ArrowDownSvg } from "../../assets/svg/arrow-down";

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
    </main>
  );
}
