import { Link } from "react-router-dom";
import logo_img from "../../../assets/images/main-logo.png";
import "./styles/header-styles.css";

export default function Header() {
  return (
    <header className="w-full h-[100px] flex justify-between items-center px-[120px] py-[30px] mb-[30px]">
      <figure>
        <Link to="/">
          <img src={logo_img} alt="logo" />
        </Link>
      </figure>

      <div className="flex gap-[40px] items-center">
        <button className="button button-add-employee">
          თანამშრომლის შექმნა
        </button>
        <Link to="/add-new-task" className="button button-add-new-task">
          + შექმენი ახალი დავალება
        </Link>
      </div>
    </header>
  );
}
