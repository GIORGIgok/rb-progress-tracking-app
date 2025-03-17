import { useEffect, useState } from "react";
import "../../styles/block-styles.css";
import { getAllTasks } from "../../../../api/tasks/get-all-tasks";
import TaskCart from "../../task-cart/task-cart";

export default function FinishedTasksBlock({ filters }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const allTasks = await getAllTasks();

        let filteredTasks = allTasks.filter((task) => task.status.id === 4);

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
        console.error("Error fetching finished tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filters]);

  return (
    <section>
      <div className="segregation-heading-parent bg-[#3A86FF]">
        <h3 className="block-heading-3">დასრულებული</h3>
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
