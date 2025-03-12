import { TOKEN } from "../../constants/api-auth-token";
import { TASKS } from "../../constants/endpoints";

export const getTaskById = async (taskId) => {
  const response = await fetch(`${TASKS}/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch task with ID: ${taskId}`);
  }

  return response.json();
};
