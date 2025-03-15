import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskDetailedInfo from "../../components/task-detailed-info-parts/detailed-info-upper-area";
import { getTaskById } from "../../api/tasks/get-task-by-id";
import StatusChangerLowerArea from "../../components/task-detailed-info-parts/status-changer-lower-area";
import { updateTaskStatus } from "../../api/statuses/change-status";
import AsideCommentsSection from "../../components/task-detailed-info-parts/aside-comments-section/aside-comments-section";

export default function TaskDetailedInfoPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!id) {
          console.log("No ID in URL params!");
          return;
        }
        const data = await getTaskById(id);
        if (data) {
          setTask(data);
        } else {
          console.log("Task not found");
        }
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    fetchTask();
  }, [id]);

  const handleStatusChange = async (newStatusId) => {
    if (task) {
      try {
        setLoading(true);
        await updateTaskStatus(task.id, newStatusId);
        setTask((prevTask) => ({
          ...prevTask,
          status: { id: newStatusId, name: newStatusId },
        }));
        console.log("Task status updated successfully!");
      } catch (err) {
        console.error("Error updating task status:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="mt-[40px] px-[120px] flex justify-between">
      {task ? (
        <>
          <section className="w-fit">
            <TaskDetailedInfo task={task} />
            <StatusChangerLowerArea
              task={task}
              onStatusChange={handleStatusChange}
              loading={loading}
            />
          </section>
          <AsideCommentsSection taskId={task.id} />
        </>
      ) : (
        <p>Loading or no task data available...</p>
      )}
    </main>
  );
}
