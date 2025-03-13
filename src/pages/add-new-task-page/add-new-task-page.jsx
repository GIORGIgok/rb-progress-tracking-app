import AddNewTaskContainer from "../../components/add-new-task-area/add-new-task-container";

export default function AddNewTaskPage() {
  return (
    <div className="px-[120px]">
      <h1 className="font-[600] text-[34px] text-[#212529] mb-[25px]">
        შექმენი ახალი დავალება
      </h1>
      <AddNewTaskContainer />
    </div>
  );
}
