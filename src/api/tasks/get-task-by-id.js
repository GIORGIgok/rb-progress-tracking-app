import { TASKS } from "../../constants/endpoints";

export const getTaskById = async (taskId) => {
  const response = await fetch(`${TASKS}/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch task with ID: ${taskId}`);
  }

  return response.json();
};
