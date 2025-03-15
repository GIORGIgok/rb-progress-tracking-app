import { useEffect, useState } from "react";
import "../../styles/block-styles.css";
import { getAllTasks } from "../../../../api/tasks/get-all-tasks";
import TaskCart from "../../task-cart/task-cart";

export default function ReadyForTestBlock() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getAllTasks();
        const todoTasks = allTasks.filter((task) => task.status.id === 3);
        // console.log("Filtered tasks:", todoTasks);
        setTasks(todoTasks);
      } catch (error) {}
    };

    fetchTasks();
  }, []);

  return (
    <section>
      <div className="segregation-heading-parent bg-[#FF006E]">
        <h3 className="block-heading-3">მზად ტესტირებისთვის</h3>
      </div>
      <div className="carts-parent-container">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCart key={task.id} task={task} />)
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </section>
  );
}
