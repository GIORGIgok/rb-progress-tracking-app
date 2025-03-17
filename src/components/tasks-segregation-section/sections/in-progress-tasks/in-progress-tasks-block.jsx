import { useEffect, useState } from "react";
import "../../styles/block-styles.css";
import { getAllTasks } from "../../../../api/tasks/get-all-tasks";
import TaskCart from "../../task-cart/task-cart";

export default function InProgressTasksBlock({ filters }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const allTasks = await getAllTasks();

        let filteredTasks = allTasks.filter((task) => task.status.id === 2);

        if (filters && filters.department && filters.department.length > 0) {
          filteredTasks = filteredTasks.filter((task) =>
            filters.department.includes(task.department.id)
          );
        }

        if (filters && filters.priority && filters.priority.length > 0) {
          filteredTasks = filteredTasks.filter((task) =>
            filters.priority.includes(task.priority.id)
          );
        }

        if (filters && filters.employee && filters.employee.id) {
          filteredTasks = filteredTasks.filter(
            (task) => task.employee && task.employee.id === filters.employee.id
          );
        }

        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching in-progress tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filters]);

  return (
    <section>
      <div className="segregation-heading-parent bg-[#FB5607]">
        <h3 className="block-heading-3">პროგრესში</h3>
      </div>
      <div className="carts-parent-container">
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => <TaskCart key={task.id} task={task} />)
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </section>
  );
}
