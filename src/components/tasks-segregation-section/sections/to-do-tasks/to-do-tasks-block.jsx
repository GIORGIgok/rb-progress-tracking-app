import { useEffect, useState } from "react";
import TaskCart from "../../task-cart/task-cart";
import { getAllTasks } from "../../../../api/tasks/get-all-tasks";
import "../../styles/block-styles.css";

export default function TodoTasksBlock() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getAllTasks();
        const todoTasks = allTasks.filter((task) => task.status.id === 1);
        console.log("Filtered tasks:", todoTasks);
        setTasks(todoTasks);
      } catch (error) {}
    };

    fetchTasks();
  }, []);

  return (
    <section>
      <div className="segregation-heading-parent bg-[#F7BC30]">
        <h3 className="block-heading-3">დასაწყები</h3>
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
