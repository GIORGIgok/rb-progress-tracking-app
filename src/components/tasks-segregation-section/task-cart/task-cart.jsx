import { CommentsIndicatorSVG } from "../../../assets/svg/comments-indicator";
import { MediumPriorityIndicatorSVG } from "../../../assets/svg/medium-priority-indicator";
import employee_img from "../.././../assets/images/employee-test-img.jpeg";

export default function TaskCart() {
  return (
    <article className="w-[381px] h-[217px] rounded-[15px] border-1 border-[#F7BC30] p-[20px] text-[12px]">
      <div className="flex justify-between mb-[28px]">
        <div className="flex items-center h-[26px] gap-[10px]">
          <div className="flex items-center gap-[4px]">
            <figure>
              <MediumPriorityIndicatorSVG />
            </figure>
            <span>საშუალო</span>
          </div>

          <span className="rounded-[15px] bg-[#FF66A8] w-[88px] h-[24px] flex items-center justify-center text-[#ffffff] font-[400]">
            დიზაინი
          </span>
        </div>
        <span className="flex items-center">22 იანვ, 2022</span>
      </div>

      <div className="m-auto w-[320px] h-[64px] text-[#212529]">
        <h4 className="text-[15px] font-[500] mb-[12px]">
          Redberry-ს საიტის ლენდინგის დიზაინი
        </h4>
        <p className="text-[14px]">
          შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
          ნავიგაციას.
        </p>
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
          <span className="ml-[4px] text-[14px]">8</span>
        </div>
      </div>
    </article>
  );
}
