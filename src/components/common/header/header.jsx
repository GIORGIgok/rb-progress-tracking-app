import "./styles/header-styles.css";
import { Link } from "react-router-dom";
import logo_img from "../../../assets/images/main-logo.png";
import add_img from "../../../assets/images/add.png";
import { useModal } from "../../../contexts/modal-context";

export default function Header() {
  const { openModal } = useModal();

  return (
    <header className="header-container">
      <figure>
        <Link to="/">
          <img src={logo_img} alt="logo" />
        </Link>
      </figure>

      <div className="flex gap-[40px] items-center">
        <button className="button button-add-employee" onClick={openModal}>
          თანამშრომლის შექმნა
        </button>

        <Link to="/add-new-task" className="button button-add-new-task">
          <figure className="flex items-center gap-[0.5px]">
            <img src={add_img} alt="add-new-task" className="size-[20px]" />
            <figcaption>შექმენი ახალი დავალება</figcaption>
          </figure>
        </Link>
      </div>
    </header>
  );
}
