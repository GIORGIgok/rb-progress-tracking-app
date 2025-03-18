import { TASKS } from "../../constants/endpoints";

export const createNewTask = async (taskData) => {
  const response = await fetch(`${TASKS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return await response.json();
};
