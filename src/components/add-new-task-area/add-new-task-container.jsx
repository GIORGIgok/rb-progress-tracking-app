import "./styles/styles.css";

export default function AddNewTaskContainer() {
  return (
    <main className="add-new-task-container">
      <div className="float-left w-[40%]">
        {/* LEFT SIDE */}
        {/*  */}
        <div className="float-left">
          <label htmlFor="title" className="label-heading">
            სათაური*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="standard-input"
          />
          <div className="standard-input-info">
            <p>მინიმუმ 2 სიმბოლო</p>
            <p className="mt-[2px]">მაქსიმუმ 255 სიმბოლო</p>
          </div>
        </div>
        {/*  */}
        <div className="float-left my-[57px]">
          <label htmlFor="description" className="label-heading">
            აღწერა
          </label>
          <input
            name="description"
            id="description"
            className="description-input"
          ></input>
          <div className="standard-input-info">
            <p>მინიმუმ 2 სიმბოლო</p>
            <p className="mt-[2px]">მაქსიმუმ 255 სიმბოლო</p>
          </div>
        </div>
        {/*  */}
        <div className="float-left w-full">
          <div className="w-[50%] float-left">
            <label htmlFor="priority" className="label-heading">
              პრიორიტეტი*
            </label>
            <select name="priority" id="priority" className="short-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="w-[50%] float-right h-[350px]">
            <label htmlFor="status" className="label-heading">
              სტატუსი*
            </label>
            <select name="status" id="status" className="short-select">
              <option value="19">1</option>
              <option value="28">2</option>
              <option value="37">3</option>
              <option value="49">4</option>
              <option value="56">5</option>
            </select>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="float-right w-[60%] pl-[141px]">
        {/* DEPARTMENT */}
        <div className="w-full float-left">
          <label htmlFor="department" className="label-heading">
            დეპარტამენტი*
          </label>
          <select name="department" id="department" className="wide-select">
            <option value="5569">1</option>
            <option value="268">2</option>
            <option value="367">3</option>
            <option value="499">4</option>
            <option value="565">5</option>
          </select>
        </div>
        {/* RESPONSIBLE EMPLOYEE */}
        <div className="mt-[94px] float-left">
          <label
            htmlFor="responsible-employee"
            className="label-heading text-[#ADB5BD]"
          >
            პასუხისმგებელი თანამშრომელი*
          </label>
          <select
            name="responsible-employee"
            id="responsible-employee"
            className="wide-select"
          >
            <option value="15569">1</option>
            <option value="212368">2</option>
            <option value="312367">3</option>
            <option value="491231239">4</option>
            <option value="561235">5</option>
          </select>
        </div>
        {/* DATE */}
        <div className="float-left mt-[178px] w-full">
          <label className="label-heading">დედლაინი</label>
          <input type="date" className="block short-select" required />
        </div>
        {/* SUBMIT BTN */}
        <div className="w-[550px] float-left mt-[80px]">
          <button className="submit-btn float-right">დავალების შექმნა</button>
        </div>
      </div>
    </main>
  );
}
