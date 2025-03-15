import { TOKEN } from "../../constants/api-auth-token";
import { TASKS } from "../../constants/endpoints";

export const updateTaskStatus = async (taskId, newStatusId) => {
  const response = await fetch(`${TASKS}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      status_id: newStatusId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task status");
  }

  return response.json();
};
