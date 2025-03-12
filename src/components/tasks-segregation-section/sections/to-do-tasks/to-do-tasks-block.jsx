import TaskCart from "../../task-cart/task-cart";
import "../../styles/block-styles.css";

export default function TodoTasksBlock() {
  return (
    <section>
      <div className="segregation-heading-parent bg-[#F7BC30]">
        <h3 className="block-heading-3">დასაწყები</h3>
      </div>
      <div className="carts-parent-container">
        <TaskCart />
        <TaskCart />
        <TaskCart />
      </div>
    </section>
  );
}
